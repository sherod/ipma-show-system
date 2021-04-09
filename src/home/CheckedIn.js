import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

function CheckedInBadge(props) {
  const isAdmin = useSelector((state) => state.entries.isAdmin);

  if (isAdmin) {
    if (props.checkedIn === true) {
      return <Badge variant="success">Paid / Checked In</Badge>;
    } else {
      return <Badge variant="secondary">Unpaid / Not Checked In</Badge>;
    }
  } else {
    return <></>;
  }
}

export default CheckedInBadge;
