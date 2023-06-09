import React from "react";
import { FormattedMessage } from "react-intl";
import FormattedMoney from "components/FormattedMoney";
import HeaderHelperCell from "components/HeaderHelperCell";
import TextWithDataTestId from "components/TextWithDataTestId";
import { detectedAt, possibleMonthlySavings, resource, resourceLocation } from "utils/columns";
import {
  FORMATTED_MONEY_TYPES,
  RECOMMENDATION_VOLUMES_NOT_ATTACHED_FOR_LONG_TIME,
  VOLUMES_NOT_ATTACHED_FOR_A_LONG_TIME_TYPE
} from "utils/constants";
import { EN_FULL_FORMAT, unixTimestampToDateTime } from "utils/datetime";
import RecommendationFactory from "utils/recommendations";

class VolumesNotAttachedForLongTimeRecommendation extends RecommendationFactory {
  type = RECOMMENDATION_VOLUMES_NOT_ATTACHED_FOR_LONG_TIME;

  moduleName = VOLUMES_NOT_ATTACHED_FOR_A_LONG_TIME_TYPE;

  withExclusions = true;

  withThresholds = true;

  messageId = "volumesAreNotAttachedTitle";

  configure() {
    return {
      type: this.type,
      moduleName: this.moduleName,
      withExclusions: this.withExclusions,
      withThresholds: this.withThresholds,
      descriptionMessageId: "volumesNotAttachedForLongTimeDescription",
      emptyMessageId: "noDetachedVolumes",
      dataTestIds: {
        listTestId: "sp_volumes_not_attached",
        textTestId: "p_volumes_not_attached",
        buttonTestIds: ["btn_vna_download", "btn_vna_cleanup_download"]
      }
    };
  }

  static configureColumns() {
    return [
      resource({
        headerDataTestId: "lbl_vna_resource"
      }),
      resourceLocation({
        headerDataTestId: "lbl_vna_location"
      }),
      {
        header: (
          <HeaderHelperCell
            titleDataTestId="lbl_vna_last_time"
            titleMessageId="lastTimeAttached"
            helperMessageId="volumesNotAttachedLastTimeHelp"
          />
        ),
        accessorKey: "last_seen_in_attached_state",
        cell: ({ cell }) => {
          const value = cell.getValue();

          return value === 0 ? <FormattedMessage id="never" /> : unixTimestampToDateTime(value, EN_FULL_FORMAT);
        }
      },
      detectedAt({ headerDataTestId: "lbl_vna_detected_at" }),
      {
        header: (
          <TextWithDataTestId dataTestId="lbl_vna_expenses">
            <FormattedMessage id="expensesWhenDetached" />
          </TextWithDataTestId>
        ),
        accessorKey: "cost_in_detached_state",
        cell: ({ cell }) => {
          const value = cell.getValue();

          return <FormattedMoney type={FORMATTED_MONEY_TYPES.COMMON} value={value} />;
        }
      },
      possibleMonthlySavings({
        headerDataTestId: "lbl_vna_possible_monthly_savings",
        defaultSort: "desc"
      })
    ];
  }
}

export default new VolumesNotAttachedForLongTimeRecommendation();
