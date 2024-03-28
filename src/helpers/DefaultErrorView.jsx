import * as React from "react";
import { Paper, Typography } from "@mui/material";

export default function DefaultErrorView() {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5">Error</Typography>
      <Typography variant="body1">
        Unexpected errors occurred. to refresh the page and try again
      </Typography>
    </Paper>
  );
}

export class DefaultErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return { error: error };
  }

  componentDidCatch(error, errorInfo) {
    // ToDo: log
  }

  render() {
    if (this.state.error) {
      return <DefaultErrorView error={this.state.error} />;
    }
    return this.props.children;
  }
}
