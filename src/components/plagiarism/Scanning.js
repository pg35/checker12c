import Request from "../util/Request";
import * as T from "../../reducer/action";

export default function Scanning(props) {
  const { state, dispatch, repeatCount = 100 } = props;
  const { scan } = state;
  return (
    <Request
      useAjaxArgs={{
        ajax: {
          data: {
            action: "pxq_pgck_get_scan_result",
            scan_id: scan.id
          }
        },
        repeatCount: repeatCount
      }}
      repeatCount={repeatCount}
      onComplete={(data) => {
        if (!data.export) return;
        dispatch(
          T.createAction(T.SCAN, {
            status: "exporting"
          })
        );
      }}
      messages={[
        "Checking plagiarism",
        "Plagiarism check completed",
        "Plagiarism check timed out"
      ]}
    />
  );
}
