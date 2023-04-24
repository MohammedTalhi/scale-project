import React from "react";
import { useFormContext } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import Input from "components/Input";
import QuestionMark from "components/QuestionMark";
import { DEFAULT_MAX_INPUT_LENGTH } from "utils/constants";

export const FIELD_NAMES = Object.freeze({
  ACCESS_KEY_ID: "alibabaAccessKeyId",
  SECRET_ACCESS_KEY: "alibabaSecretAccessKey"
});

const AlibabaCredentials = () => {
  const intl = useIntl();
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      <Input
        required
        dataTestId="input_alibaba_access_key_id"
        error={!!errors[FIELD_NAMES.ACCESS_KEY_ID]}
        helperText={errors[FIELD_NAMES.ACCESS_KEY_ID] && errors[FIELD_NAMES.ACCESS_KEY_ID].message}
        InputProps={{
          endAdornment: (
            <QuestionMark
              messageId="alibabaAccessKeyIdTooltip"
              messageValues={{
                i: (chunks) => <i>{chunks}</i>
              }}
              dataTestId="qmark_access_key"
            />
          )
        }}
        label={<FormattedMessage id="alibabaAccessKeyId" />}
        autoComplete="off"
        {...register(FIELD_NAMES.ACCESS_KEY_ID, {
          required: {
            value: true,
            message: intl.formatMessage({ id: "thisFieldIsRequired" })
          },
          maxLength: {
            value: DEFAULT_MAX_INPUT_LENGTH,
            message: intl.formatMessage(
              { id: "maxLength" },
              { inputName: intl.formatMessage({ id: "alibabaAccessKeyId" }), max: DEFAULT_MAX_INPUT_LENGTH }
            )
          }
        })}
      />
      <Input
        required
        isMasked
        dataTestId="input_secret_key"
        name={FIELD_NAMES.SECRET_ACCESS_KEY}
        error={!!errors[FIELD_NAMES.SECRET_ACCESS_KEY]}
        helperText={errors[FIELD_NAMES.SECRET_ACCESS_KEY] && errors[FIELD_NAMES.SECRET_ACCESS_KEY].message}
        InputProps={{
          endAdornment: (
            <QuestionMark
              messageId="alibabaSecretAccessKeyTooltip"
              messageValues={{
                i: (chunks) => <i>{chunks}</i>
              }}
              dataTestId="qmark_secret_key"
            />
          )
        }}
        label={<FormattedMessage id="alibabaSecretAccessKey" />}
        autoComplete="off"
        {...register(FIELD_NAMES.SECRET_ACCESS_KEY, {
          required: {
            value: true,
            message: intl.formatMessage({ id: "thisFieldIsRequired" })
          },
          maxLength: {
            value: DEFAULT_MAX_INPUT_LENGTH,
            message: intl.formatMessage(
              { id: "maxLength" },
              { inputName: intl.formatMessage({ id: "alibabaSecretAccessKey" }), max: DEFAULT_MAX_INPUT_LENGTH }
            )
          }
        })}
      />
    </>
  );
};

export default AlibabaCredentials;
