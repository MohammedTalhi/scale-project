import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import ButtonLoader from "components/ButtonLoader";
import ConditionWrapper from "components/ConditionWrapper";
import Logo from "components/Logo";
import PageTitle from "components/PageTitle";
import { SPACING_4 } from "utils/layouts";

const LiveDemo = ({ isLoading, retry, showRetry = false }) => (
  <Stack spacing={SPACING_4} alignItems="center">
    <Box>
      <Logo width={200} dataTestId="img_logo" />
    </Box>
    <ConditionWrapper
      condition={isLoading}
      conditionTemplate={
        <>
          <Box pl={2} pr={2}>
            <PageTitle dataTestId="p_preparing_ld" align="center">
              <FormattedMessage id="preparingLiveDemoMessage" />
            </PageTitle>
            <Typography align="center" data-test-id="p_process_ld">
              <FormattedMessage
                id="usuallyTheProcessTakesLessThanSeconds"
                values={{
                  value: 10
                }}
              />
            </Typography>
          </Box>
          <Box height={60}>
            <CircularProgress data-test-id="svg_loading" />
          </Box>
        </>
      }
    >
      <ConditionWrapper
        condition={showRetry}
        conditionTemplate={
          <>
            <Box pl={2} pr={2}>
              <PageTitle align="center">
                <FormattedMessage id="failedLiveDemoMessage" />
              </PageTitle>
            </Box>
            <Box>
              <ButtonLoader
                size="large"
                messageId="retry"
                color="primary"
                variant="contained"
                onClick={retry}
                isLoading={isLoading}
              />
            </Box>
          </>
        }
      />
    </ConditionWrapper>
  </Stack>
);

LiveDemo.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  retry: PropTypes.func.isRequired,
  showRetry: PropTypes.bool.isRequired
};

export default LiveDemo;
