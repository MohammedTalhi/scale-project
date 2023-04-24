import React from "react";
import { useParams } from "react-router-dom";
import MlModelRun from "components/MlModelRun";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import MlApplicationsService from "services/MlApplicationsService";
import { getRunDetails } from "utils/mlDemoData/utils";

const DemoContainer = () => {
  const { runId } = useParams();

  return <MlModelRun run={getRunDetails(runId)} />;
};

const Container = () => {
  const { runId } = useParams();

  const { useGetModelRun } = MlApplicationsService();

  const { isLoading, run } = useGetModelRun(runId);

  return <MlModelRun isLoading={isLoading} run={run} />;
};

const MlModelRunContainer = () => {
  const { isDemo } = useOrganizationInfo();

  return isDemo ? <DemoContainer /> : <Container />;
};

export default MlModelRunContainer;
