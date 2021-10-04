const logger = require("../../config/logger");

const Product = require("../../models/services/Product/Product");

const communities = {
  home: async (req, res) => {
    try {
      let response = {};

      const query = req.query;
      if (isNaN(query.startNo)) {
        response = getError400(
          "GET /api/communities",
          "잘못된 요청입니다. {startNo}는 숫자만 가능합니다.",
        );
        return res.status(400).json(response);
      } else if (isNaN(query.limit)) {
        response = getError400(
          "GET /api/communities",
          "잘못된 요청입니다. {limit}는 숫자만 가능합니다.",
        );
        return res.status(400).json(response);
      }

      if (isNaN(query.startPriceRange) || query.startPriceRange < 0) {
        req.query.startPriceRange = 0;
      }

      if (isNaN(query.endPriceRange) || query.endPriceRange > 999999999) {
        req.query.endPriceRange = 999999999;
      }

      req.sql = "";
      if (!isNaN(query.regionNo)) {
        req.sql += `AND region_no = ${query.regionNo} `;
      }

      if (!isNaN(query.schoolNo)) {
        req.sql += `AND school_no = ${query.schoolNo} `;
      }

      if (!isNaN(query.departmentNo)) {
        req.sql += `AND department_no = ${query.departmentNo} `;
      }

      if (!isNaN(query.majorNo)) {
        req.sql += `AND major_no = ${query.majorNo} `;
      }

      const product = new Product(req);
      const communities = await product.findAllAboutMarketBasedPrice();

      response = {
        success: true,
        msg: "가격별 물품 데이터 조회에 성공하셨습니다.",
        communities,
      };

      logger.info(`GET /api/communities 200 ${response.msg}`);
      return res.status(200).json(response);
    } catch (err) {
      logger.error(`GET /api/communities 500 err: ${err}`);
      return res.status(500).json(err);
    }
  },
};

const getError400 = (url, errorMsg) => {
  const response = {
    success: false,
    msg: errorMsg,
  };

  logger.error(`${url} 400 ${response.msg}`);
  return response;
};

module.exports = {
  communities,
};
