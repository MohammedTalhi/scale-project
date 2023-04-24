import React from "react";
import PropTypes from "prop-types";
import KeyValueLabelsList from "components/KeyValueLabelsList";
import { GCP_CNR } from "utils/constants";

const GcpProperties = ({ accountId, config }) => {
  const { billing_data: { dataset_name: datasetName, table_name: tableName } = {} } = config;

  const items = [
    {
      itemKey: "GCPAccountId",
      messageId: "GCPAccountId",
      value: accountId,
      dataTestIds: {
        key: `p_${GCP_CNR}_id`,
        value: `p_${GCP_CNR}_value`
      }
    },
    {
      itemKey: "billingDataDatasetName",
      messageId: "billingDataDatasetName",
      value: datasetName,
      dataTestIds: { key: "p_dataset_name_key", value: "p_dataset_name_value" }
    },
    {
      itemKey: "billingDataTableName",
      messageId: "billingDataTableName",
      value: tableName,
      dataTestIds: { key: "p_table_name_key", value: "p_table_name_value" }
    }
  ];

  return <KeyValueLabelsList items={items} />;
};

GcpProperties.propTypes = {
  accountId: PropTypes.string.isRequired,
  config: PropTypes.shape({
    billing_data: PropTypes.shape({
      dataset_name: PropTypes.string,
      table_name: PropTypes.string
    })
  })
};

export default GcpProperties;
