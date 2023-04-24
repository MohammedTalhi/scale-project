import React from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/system";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import ConditionWrapper from "components/ConditionWrapper";
import Logo from "components/Logo";
import MailTo from "components/MailTo";
import PageTitle from "components/PageTitle";
import { EMAIL_SUPPORT, HOME } from "urls";
import { SPACING_4 } from "utils/layouts";

const ConnectSlack = ({ isLoading, isError = false }) => (
  <Stack spacing={SPACING_4} direction="column" alignItems="center">
    <Box>
      <Logo width={200} dataTestId="img_logo" />
    </Box>
    <ConditionWrapper
      condition={isLoading}
      conditionTemplate={
        <>
          <Box pr={2} pl={2}>
            <PageTitle dataTestId="p_connecting_su" align="center">
              <FormattedMessage id="connectingSlackUser" />
            </PageTitle>
          </Box>
          <Box height={60}>
            <CircularProgress data-test-id="svg_loading" />
          </Box>
        </>
      }
    >
      <ConditionWrapper
        condition={isError}
        conditionTemplate={
          <>
            <Box pr={2} pl={2}>
              <PageTitle align="center">
                <FormattedMessage id="somethingWentWrong" />
              </PageTitle>
            </Box>
            <Box pr={2} pl={2}>
              <Typography>
                <FormattedMessage
                  id="pleaseContactSupport"
                  values={{
                    supportEmail: (chunks) => <MailTo email={EMAIL_SUPPORT} text={chunks[0]} />
                  }}
                />
              </Typography>
            </Box>
          </>
        }
      >
        <Box pr={2} pl={2}>
          <PageTitle align="center">
            <FormattedMessage id="slackUserConnected" />
          </PageTitle>
        </Box>
        <Box pr={2} pl={2}>
          <Typography align="center">
            <FormattedMessage id="slackUserConnectedOptions" />
          </Typography>
        </Box>
        <Box>
          <Button
            color="primary"
            variant="contained"
            messageId="goToDashboard"
            size="medium"
            link={HOME}
            startIcon={<NavigationIcon />}
          />
        </Box>
      </ConditionWrapper>
    </ConditionWrapper>
  </Stack>
);

ConnectSlack.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

export default ConnectSlack;
