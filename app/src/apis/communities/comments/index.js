const express = require("serverless-express/express");
const joi = require("../../../utils/schemas");
const validation = require("../../../middleware/validation");
const ctrl = require("./comments.ctrl");

const router = express.Router();

router.post("/", validation(joi.comment.create.body, "body"), ctrl.create);

router.patch(
  "/:commentNo",
  validation(joi.comment.updateLikeCnt.params, "params"),
  validation(joi.comment.updateLikeCnt.body, "body"),
  ctrl.updateLikeCnt,
);

router.put(
  "/:commentNo",
  validation(joi.comment.updateContent.body, "body"),
  validation(joi.comment.updateContent.params, "body"),
  ctrl.updateComment,
);

router.delete(
  "/:commentNo",
  validation(joi.comment.delete.params, "params"),
  ctrl.delete,
);

module.exports = router;
