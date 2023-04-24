import React from "react";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import ActionBar from "components/ActionBar";
import InviteEmployeesForm from "components/InviteEmployeesForm";
import PageContentWrapper from "components/PageContentWrapper";
import { USER_MANAGEMENT } from "urls";

const actionBarDefinition = {
  title: {
    text: <FormattedMessage id="inviteUsersTitle" />,
    dataTestId: "lbl_users_invitation"
  }
};

const InviteEmployees = ({ onSubmit, availablePools, isLoadingProps = {} }) => {
  const navigate = useNavigate();

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Box sx={{ width: { xl: "50%" } }}>
          <InviteEmployeesForm
            availablePools={availablePools}
            onSubmit={onSubmit}
            onCancel={() => navigate(USER_MANAGEMENT)}
            isLoadingProps={isLoadingProps}
          />
        </Box>
      </PageContentWrapper>
    </>
  );
};

InviteEmployees.propTypes = {
  onSubmit: PropTypes.func,
  availablePools: PropTypes.array,
  isLoadingProps: PropTypes.object
};

export default InviteEmployees;
