const express = require("serverless-express/express");
const ctrl = require("./selllist.ctrl");
const joi = require("../../utils/schemas");
const validation = require("../../middleware/validation");

const router = express.Router();

router.get(
  "/:userNo",
  validation(joi.selllist.GET_schema, "params"),
  ctrl.selllist,
);
router.get(
  "/finish/:userNo",
  validation(joi.selllist.GET_schema, "params"),
  ctrl.endSelllist,
);

module.exports = router;
