import React, { useState } from "react";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { FormattedMessage } from "react-intl";
import { GET_CLOUD_ACCOUNTS } from "api/restapi/actionTypes";
import FormattedOrganizationCurrency from "components/FormattedOrganizationCurrency";
import IconButton from "components/IconButton";
import KeyValueLabel from "components/KeyValueLabel";
import EditOrganizationCurrencyFormContainer from "containers/EditOrganizationCurrencyFormContainer";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useApiData } from "hooks/useApiData";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { ENVIRONMENT } from "utils/constants";

const Currency = () => {
  const theme = useTheme();

  const { currency: currencyCode } = useOrganizationInfo();

  const {
    apiData: { cloudAccounts = [] }
  } = useApiData(GET_CLOUD_ACCOUNTS);

  const [isEditMode, setIsEditMode] = useState(false);
  const enableEditMode = () => setIsEditMode(true);
  const disableEditMode = () => setIsEditMode(false);

  const isEditAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return isEditMode ? (
    <EditOrganizationCurrencyFormContainer onCancel={disableEditMode} />
  ) : (
    <Box display="flex">
      <KeyValueLabel
        messageId="currency"
        value={<FormattedOrganizationCurrency currencyCode={currencyCode} />}
        typographyProps={{ style: { marginRight: theme.spacing(1) } }}
      />
      {isEditAllowed && cloudAccounts.filter(({ type }) => type !== ENVIRONMENT).length === 0 ? (
        <IconButton
          icon={<CreateOutlinedIcon />}
          onClick={enableEditMode}
          tooltip={{
            show: true,
            messageId: "edit"
          }}
        />
      ) : null}
    </Box>
  );
};

const OrganizationCurrency = () => (
  <>
    <Typography gutterBottom>
      <FormattedMessage id="organizationCurrencyDescription" />
    </Typography>
    <Currency />
  </>
);

export default OrganizationCurrency;
