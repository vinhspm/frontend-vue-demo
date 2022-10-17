import { FIELD_NAME_VN } from "@/resources.js";
import { RULE_CODES } from "@/enum.js";

export const BaseValidateMixins = {
  data() {
    return {
      needValidateData: {},
    };
  },
  methods: {
    
    /**
     * hàm validate của form detail nhân viên khi click nút cất
     * author: vinhkt
     * created: 24/09/2022
     * @returns listError: {
     *    fieldKey: errorMsg
     * }
     */
    validateData() {
      try {
        const listError = {};
        for (const key of Object.keys(this.needValidateData)) {
          const rules = this.needValidateData[key].rules;
          for (let index in rules) {
            if (rules[index] === RULE_CODES.REQUIRE) {
              if (!this.needValidateData[key].value) {
                const error = {
                  key: key,
                  msg: `${FIELD_NAME_VN[key]} không được để trống`,
                };
                listError[error.key] = error.msg;
              }
            }
          }
        }
        return listError;
      } catch (err) {
        console.log(err);
      }
    },
  },
};
