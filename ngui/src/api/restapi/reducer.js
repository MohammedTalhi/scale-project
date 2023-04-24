import { reformatBreakdown } from "utils/api";
import { removeObjects } from "utils/arrays";
import { isEmpty as isEmptyObject } from "utils/objects";
import {
  SET_ORGANIZATION_FEATURES,
  SET_ORGANIZATION_OPTIONS,
  SET_ORGANIZATION_OPTION,
  SET_ORGANIZATION_CONSTRAINTS,
  DELETE_CLOUD_ACCOUNT,
  SET_POOL,
  SET_CLOUD_ACCOUNT,
  SET_CLOUD_ACCOUNTS,
  SET_CLOUD_ACCOUNT_DETAILS,
  SET_ORGANIZATIONS,
  SET_ORGANIZATIONS_OVERVIEW,
  SET_POOL_EXPENSES_BREAKDOWN,
  SET_CLOUDS_EXPENSES,
  SET_EMPLOYEES_EXPENSES,
  SET_INVITATION,
  SET_SPLIT_RESOURCES,
  SET_AVAILABLE_POOLS,
  SET_POOL_OWNERS,
  SET_AUTHORIZED_EMPLOYEES,
  SET_EMPLOYEES,
  SET_ORGANIZATION_EXPENSES,
  SET_CURRENT_EMPLOYEE,
  SET_RAW_EXPENSES,
  SET_CLEAN_EXPENSES,
  SET_EXPENSES_SUMMARY,
  SET_ASSIGNMENT_RULES,
  SET_ASSIGNMENT_RULE,
  SET_RESOURCE,
  SET_POOL_POLICIES,
  SET_POOL_POLICY,
  SET_RESOURCE_CONSTRAINT,
  DELETE_RESOURCE_CONSTRAINT,
  SET_RESOURCE_LIMIT_HITS,
  SET_REGION_EXPENSES,
  SET_TRAFFIC_EXPENSES,
  SET_OPTIMIZATIONS,
  SET_LIVE_DEMO,
  SET_TTL_ANALYSIS,
  SET_FINOPS_CHECKLIST,
  SET_TECHNICAL_AUDIT,
  SET_CLUSTER_TYPES,
  SET_ENVIRONMENTS,
  SET_ENVIRONMENT_BOOKINGS,
  CREATE_WEBHOOK,
  UPDATE_WEBHOOK,
  DELETE_WEBHOOK,
  SET_WEBHOOKS,
  SET_SSH_KEYS,
  CREATE_SSH_KEY,
  UPDATE_POOL_EXPENSES_EXPORT,
  SET_COST_EXPLORER_POOL_EXPENSES,
  SET_DATA_SOURCE_NODES,
  SET_RESOURCE_METRICS,
  SET_RESOURCE_COST_MODEL,
  SET_OPTIMIZATION_OPTIONS,
  SET_ORGANIZATION_CALENDAR,
  UPDATE_ENVIRONMENT_PROPERTY,
  SET_INVITATIONS,
  UPDATE_SSH_KEY,
  SET_RESOURCE_COUNT_BREAKDOWN,
  SET_TAGS_BREAKDOWN,
  SET_AVAILABLE_FILTERS,
  SET_EXPENSES_DAILY_BREAKDOWN,
  SET_ORGANIZATION_CONSTRAINT,
  UPDATE_ORGANIZATION_CONSTRAINT,
  SET_ORGANIZATION_LIMIT_HITS,
  SET_RECOMMENDATIONS_DOWNLOAD_OPTIONS,
  SET_GLOBAL_POOL_POLICIES,
  SET_GLOBAL_RESOURCE_CONSTRAINTS,
  UPDATE_GLOBAL_POOL_POLICY,
  UPDATE_GLOBAL_RESOURCE_CONSTRAINT,
  SET_ARCHIVED_OPTIMIZATIONS_COUNT,
  SET_ARCHIVED_OPTIMIZATIONS_BREAKDOWN,
  SET_ARCHIVED_OPTIMIZATION_DETAILS,
  SET_K8S_RIGHTSIZING,
  DELETE_POOL,
  UPDATE_ORGANIZATION_THEME_SETTINGS,
  SET_ORGANIZATION_THEME_SETTINGS,
  SET_ORGANIZATION_PERSPECTIVES,
  UPDATE_ORGANIZATION_PERSPECTIVES,
  CREATE_ORGANIZATION,
  UPDATE_ENVIRONMENT_SSH_REQUIREMENT,
  SET_ML_APPLICATIONS,
  SET_ML_GLOBAL_PARAMETERS,
  SET_ML_GLOBAL_PARAMETER,
  SET_PROFILING_TOKEN,
  SET_ML_EXECUTORS,
  SET_ML_EXECUTORS_BREAKDOWN,
  SET_ML_APPLICATION,
  SET_ML_APPLICATION_RUNS,
  SET_ML_RUN_DETAILS,
  SET_ML_RUN_DETAILS_BREAKDOWN
} from "./actionTypes";

export const RESTAPI = "restapi";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ORGANIZATION_FEATURES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATION_THEME_SETTINGS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATION_OPTIONS: {
      return {
        ...state,
        [action.label]: action.payload.options
      };
    }
    case SET_ORGANIZATION_OPTION: {
      return {
        ...state,
        [action.label]: action.payload.value
      };
    }
    case SET_CLOUD_ACCOUNTS: {
      const { cloud_accounts: incomingCloudAccounts } = action.payload;
      const { cloudAccounts: currentCloudAccounts = [] } = state[action.label] || {};
      const updatedCloudAccounts = incomingCloudAccounts.map((incomingCloudAccount) => {
        const currentCloudAccount = currentCloudAccounts.find((el) => el.id === incomingCloudAccount.id);
        const { details: currentDetails = {} } = currentCloudAccount || {};
        const { details: incomingDetails = {} } = incomingCloudAccount;
        if (isEmptyObject(incomingDetails)) {
          return { ...incomingCloudAccount, details: currentDetails };
        }
        return incomingCloudAccount;
      });
      return {
        ...state,
        [action.label]: {
          cloudAccounts: updatedCloudAccounts
        }
      };
    }
    case SET_CLOUD_ACCOUNT: {
      const cloudAccounts = state[action.label] || { cloudAccounts: [] };
      return {
        ...state,
        [action.label]: {
          latestCreated: action.payload,
          cloudAccounts: [...cloudAccounts.cloudAccounts, action.payload]
        }
      };
    }
    case UPDATE_POOL_EXPENSES_EXPORT: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_POOL:
      return {
        ...state,
        [action.label]: {
          pool: action.payload
        }
      };
    case DELETE_POOL:
      // note: that code does nothing in current UI flow: GET_POOL storage at the moment of pool deletion is _that pool_.
      // but if we place "remove button" to any other place (for example, at pools table) — filter will work
      return {
        ...state,
        [action.label]: {
          pool: {
            ...state[action.label].pool,
            children: state[action.label].pool.children?.filter(({ id: childId }) => childId !== action.payload.id)
          }
        }
      };
    case SET_CLOUD_ACCOUNT_DETAILS:
      return {
        ...state,
        [action.label]: {
          cloudAccountDetails: action.payload
        }
      };
    case SET_SPLIT_RESOURCES: {
      return {
        ...state,
        [action.label]: {
          splitResources: action.payload
        }
      };
    }
    case SET_AVAILABLE_POOLS: {
      const { pools = [] } = action.payload;
      return {
        ...state,
        [action.label]: {
          pools
        }
      };
    }
    case SET_POOL_OWNERS: {
      const { employees = [] } = action.payload;
      return {
        ...state,
        [action.label]: {
          poolOwners: employees
        }
      };
    }
    case SET_AUTHORIZED_EMPLOYEES:
    case SET_EMPLOYEES: {
      const { employees = [] } = action.payload;
      return {
        ...state,
        [action.label]: {
          employees
        }
      };
    }
    case SET_CURRENT_EMPLOYEE: {
      return {
        ...state,
        [action.label]: {
          currentEmployee: action.payload
        }
      };
    }
    case DELETE_CLOUD_ACCOUNT: {
      const cloudAccounts = state[action.label] || { cloudAccounts: [] };
      const updatedCloudAccounts = removeObjects(cloudAccounts.cloudAccounts, "id", action.payload.id);
      return {
        ...state,
        [action.label]: {
          cloudAccounts: updatedCloudAccounts
        }
      };
    }
    case CREATE_ORGANIZATION: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATIONS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATIONS_OVERVIEW: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATION_EXPENSES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATION_CONSTRAINTS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ORGANIZATION_CONSTRAINT: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case UPDATE_ORGANIZATION_CONSTRAINT: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_POOL_EXPENSES_BREAKDOWN:
    case SET_CLOUDS_EXPENSES:
    case SET_EMPLOYEES_EXPENSES:
    case SET_REGION_EXPENSES:
      return {
        ...state,
        [action.label]: {
          expenses: action.payload.expenses
        }
      };
    case SET_TRAFFIC_EXPENSES:
      return {
        ...state,
        [action.label]: {
          expenses: action.payload
        }
      };
    case SET_COST_EXPLORER_POOL_EXPENSES: {
      return {
        ...state,
        [action.label]: {
          expenses: {
            ...action.payload.expenses,
            breakdown: Object.fromEntries(
              Object.entries(action.payload.expenses.breakdown).map(([sTimestamp, expenseNumber]) => [
                sTimestamp,
                [
                  {
                    name: "expenses",
                    expense: expenseNumber
                  }
                ]
              ])
            )
          }
        }
      };
    }
    case SET_INVITATION:
      return {
        ...state,
        [action.label]: {
          invitation: action.payload
        }
      };
    case SET_INVITATIONS:
      return {
        ...state,
        [action.label]: action.payload.invites
      };
    case SET_RAW_EXPENSES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_CLEAN_EXPENSES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_EXPENSES_SUMMARY: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_AVAILABLE_FILTERS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_RESOURCE_COUNT_BREAKDOWN: {
      return {
        ...state,
        [action.label]: {
          ...action.payload
        }
      };
    }
    case SET_TAGS_BREAKDOWN: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ASSIGNMENT_RULE: {
      return {
        ...state,
        [action.label]: {
          assignmentRule: action.payload
        }
      };
    }
    case SET_ASSIGNMENT_RULES: {
      return {
        ...state,
        [action.label]: {
          assignmentRules: action.payload
        }
      };
    }
    case SET_K8S_RIGHTSIZING: {
      return {
        ...state,
        [action.label]: {
          k8sRightsizing: action.payload
        }
      };
    }
    case SET_RESOURCE:
      return {
        ...state,
        [action.label]: {
          resource: action.payload
        }
      };
    case SET_POOL_POLICIES: {
      return {
        ...state,
        [action.label]: {
          poolPolicies: action.payload.policies
        }
      };
    }
    case SET_POOL_POLICY: {
      const policy = action.payload;
      const { poolPolicies = [] } = state[action.label];
      const currentPolicies = poolPolicies.filter(({ type }) => type !== policy.type);
      return {
        ...state,
        [action.label]: {
          poolPolicies: [...currentPolicies, policy]
        }
      };
    }
    case SET_RESOURCE_CONSTRAINT: {
      const { resource: { details: { constraints = {} } = {} } = {} } = state[action.label];
      const currentConstraints = Object.keys(constraints)
        .filter((key) => key !== action.payload.type)
        .reduce((result, key) => ({ ...result, [key]: constraints[key] }), {});
      return {
        ...state,
        [action.label]: {
          resource: {
            ...state[action.label].resource,
            details: {
              ...state[action.label].resource.details,
              constraints: { ...currentConstraints, [action.payload.type]: action.payload }
            }
          }
        }
      };
    }
    case DELETE_RESOURCE_CONSTRAINT: {
      const { resource: { details: { constraints = {} } = {} } = {} } = state[action.label];
      const currentConstraints = Object.keys(constraints).reduce((result, key) => {
        if (constraints[key].id !== action.payload) {
          return { ...result, [key]: constraints[key] };
        }
        return result;
      }, {});
      return {
        ...state,
        [action.label]: {
          resource: {
            ...state[action.label].resource,
            details: {
              ...state[action.label].resource.details,
              constraints: { ...currentConstraints }
            }
          }
        }
      };
    }
    case SET_RESOURCE_LIMIT_HITS: {
      return {
        ...state,
        [action.label]: {
          limitHits: action.payload.limit_hits
        }
      };
    }
    case SET_OPTIMIZATIONS: {
      return {
        ...state,
        [action.label]: {
          optimizations: {
            ...(state?.[action.label]?.optimizations ?? {}),
            ...action.payload
          }
        }
      };
    }
    case SET_LIVE_DEMO: {
      const liveDemo = state[action.label] || {};
      return {
        ...state,
        [action.label]: { ...liveDemo, ...action.payload }
      };
    }
    case SET_TTL_ANALYSIS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_FINOPS_CHECKLIST: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_TECHNICAL_AUDIT: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_RECOMMENDATIONS_DOWNLOAD_OPTIONS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_CLUSTER_TYPES: {
      return {
        ...state,
        [action.label]: {
          clusterTypes: [...action.payload.cluster_types]
        }
      };
    }
    case SET_ENVIRONMENTS: {
      return {
        ...state,
        [action.label]: action.payload.data
      };
    }
    case SET_ENVIRONMENT_BOOKINGS: {
      return {
        ...state,
        [action.label]: action.payload.bookings
      };
    }
    case SET_WEBHOOKS: {
      return {
        ...state,
        [action.label]: action.payload.webhooks
      };
    }
    case CREATE_WEBHOOK:
    case UPDATE_WEBHOOK:
      return {
        ...state,
        [action.label]: [...(state[action.label] ?? []), action.payload]
      };
    case DELETE_WEBHOOK: {
      const webhooks = state[action.label] ?? [];
      const updatedWebhooks = removeObjects(webhooks, "id", action.payload);
      return {
        ...state,
        [action.label]: updatedWebhooks
      };
    }
    case SET_SSH_KEYS: {
      return {
        ...state,
        [action.label]: action.payload.ssh_keys
      };
    }
    case CREATE_SSH_KEY: {
      return {
        ...state,
        [action.label]: [...(state[action.label] ?? []), action.payload]
      };
    }
    case UPDATE_SSH_KEY: {
      const updatedSshKeys = (state[action.label] ?? []).map((key) => ({ ...key, default: key.id === action.payload.id }));
      return {
        ...state,
        [action.label]: updatedSshKeys
      };
    }
    case SET_DATA_SOURCE_NODES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_RESOURCE_METRICS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_RESOURCE_COST_MODEL: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_OPTIMIZATION_OPTIONS: {
      return {
        ...state,
        [action.label]: JSON.parse(action.payload.value)
      };
    }
    case SET_ORGANIZATION_CALENDAR:
      return {
        ...state,
        [action.label]: action.payload
      };
    case SET_ORGANIZATION_PERSPECTIVES:
      return {
        ...state,
        [action.label]: action.payload
      };
    case UPDATE_ORGANIZATION_PERSPECTIVES: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case UPDATE_ENVIRONMENT_PROPERTY: {
      return {
        ...state,
        [action.label]: {
          // TODO: remove "resource" layer
          resource: {
            ...state[action.label].resource,
            ...action.payload
          }
        }
      };
    }
    case UPDATE_ENVIRONMENT_SSH_REQUIREMENT: {
      return {
        ...state,
        [action.label]: {
          resource: {
            ...state[action.label].resource,
            ssh_only: action.payload.ssh_only
          }
        }
      };
    }
    case SET_EXPENSES_DAILY_BREAKDOWN: {
      return {
        ...state,
        [action.label]: {
          ...action.payload,
          breakdown: reformatBreakdown(action.payload.breakdown)
        }
      };
    }
    case SET_ORGANIZATION_LIMIT_HITS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_GLOBAL_POOL_POLICIES: {
      const { resource_policies: resourcePolicies = [] } = action.payload;

      return {
        ...state,
        [action.label]: resourcePolicies
      };
    }
    case SET_GLOBAL_RESOURCE_CONSTRAINTS: {
      const { resource_constraints: resourceConstraints = [] } = action.payload;

      return {
        ...state,
        [action.label]: resourceConstraints
      };
    }
    case UPDATE_GLOBAL_POOL_POLICY:
    case UPDATE_GLOBAL_RESOURCE_CONSTRAINT: {
      const currentState = state[action.label];

      return {
        ...state,
        [action.label]: currentState.map((currentData) => {
          if (currentData.id === action.payload.id && currentData.type === action.payload.type) {
            return {
              ...currentData,
              ...action.payload
            };
          }
          return currentData;
        })
      };
    }
    case SET_ARCHIVED_OPTIMIZATIONS_COUNT: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ARCHIVED_OPTIMIZATIONS_BREAKDOWN: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ARCHIVED_OPTIMIZATION_DETAILS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case UPDATE_ORGANIZATION_THEME_SETTINGS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_APPLICATIONS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_GLOBAL_PARAMETERS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_GLOBAL_PARAMETER: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_PROFILING_TOKEN: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_EXECUTORS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_EXECUTORS_BREAKDOWN: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_APPLICATION: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_APPLICATION_RUNS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_RUN_DETAILS: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    case SET_ML_RUN_DETAILS_BREAKDOWN: {
      return {
        ...state,
        [action.label]: action.payload
      };
    }
    default:
      return state;
  }
};

export default reducer;
