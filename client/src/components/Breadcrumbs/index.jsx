import { Breadcrumbs as BreadcrumbsMUI } from "@mui/material";
import { useMatches } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link as RouterLink } from "react-router-dom";
import { Link, Typography } from "@mui/material";

const Breadcrumbs = () => {
  let matches = useMatches();
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => match.handle.crumb(match.data || match.params));

  const breadcrumbs = crumbs.map((crumb, ind) => {
    const notLast = ind < crumbs.length - 1;
    if (notLast) {
      return (
        <div key={ind}>
          <Link
            component={RouterLink}
            color="text.primary"
            underline="hover"
            variant="body1"
            to={crumb.to}
          >
            {crumb.element}
          </Link>
        </div>
      );
    } else {
      return (
        <span key={ind} className="name">
          <Typography color="secondary"> {crumb.element} </Typography>
        </span>
      );
    }
  });

  return (
    <BreadcrumbsMUI separator={<NavigateNextIcon />} fontSize="medium">
      {breadcrumbs}
    </BreadcrumbsMUI>
  );
};

export default Breadcrumbs;
