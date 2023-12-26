import { Box, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import LeaderboardDatasetDetailsContainer from "containers/LeaderboardDatasetDetailsContainer";
import { isEmpty as isEmptyArray } from "utils/arrays";
import AddLeaderboardCriteriaButton from "./AddLeaderboardCriteriaButton";
import LeaderboardDatasetCard from "./LeaderboardDatasetCard";

const NoLeaderboards = ({ leaderboardId }) => (
  <Box>
    <Typography gutterBottom>
      <FormattedMessage id="noLeaderboards" />
    </Typography>
    <AddLeaderboardCriteriaButton leaderboardId={leaderboardId} />
  </Box>
);

const LeaderboardDatasetsListSection = ({
  leaderboard,
  leaderboardDatasets,
  selectedLeaderboardDataset,
  onSelectedLeaderboardDashboardChange
}) => (
  <Box
    sx={{
      display: "flex",
      gap: 1,
      alignItems: "center",
      flexDirection: {
        xs: "row",
        md: "column"
      },
      justifyContent: {
        xs: "space-between",
        md: "normal"
      }
    }}
  >
    <AddLeaderboardCriteriaButton
      leaderboardId={leaderboard.id}
      sx={{
        width: {
          md: "100%"
        },
        order: {
          xs: 1,
          md: 0
        }
      }}
    />
    <Box
      sx={{
        display: "flex",
        gap: 1,
        overflow: "auto",
        minWidth: "150px",
        flexDirection: {
          xs: "row",
          md: "column"
        }
      }}
    >
      {selectedLeaderboardDataset &&
        leaderboardDatasets.map((leaderboardDataset) => {
          const isSelected = leaderboardDataset.name === selectedLeaderboardDataset.name;
          return (
            <LeaderboardDatasetCard
              key={leaderboard.id}
              leaderboardDataset={leaderboardDataset}
              onClick={() => onSelectedLeaderboardDashboardChange(leaderboardDataset)}
              selected={isSelected}
            />
          );
        })}
    </Box>
  </Box>
);

const LeaderboardDatasets = ({
  leaderboard,
  leaderboardDatasets = [],
  onSelectedLeaderboardDashboardChange,
  selectedLeaderboardDataset
}) => (
  <Box
    display="flex"
    sx={{
      flexDirection: {
        xs: "column",
        md: "row"
      },
      gap: {
        md: 2
      }
    }}
  >
    {isEmptyArray(leaderboardDatasets) ? (
      <NoLeaderboards leaderboardId={leaderboard.id} />
    ) : (
      <>
        <LeaderboardDatasetsListSection
          leaderboard={leaderboard}
          leaderboardDatasets={leaderboardDatasets}
          selectedLeaderboardDataset={selectedLeaderboardDataset}
          onSelectedLeaderboardDashboardChange={onSelectedLeaderboardDashboardChange}
        />
        {selectedLeaderboardDataset && (
          <LeaderboardDatasetDetailsContainer leaderboard={leaderboard} leaderboardDatasetId={selectedLeaderboardDataset.id} />
        )}
      </>
    )}
  </Box>
);

export default LeaderboardDatasets;
