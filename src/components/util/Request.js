import { useEffect } from "react";
import Progress from "../ui/Progress";
import { useAjax } from "../../util/hooks";

export default function Request(props) {
  const { state, dispatch, onComplete, messages, repeatCount } = props;
  const [response, ajaxFuncs, counter] = useAjax(props.useAjaxArgs);

  useEffect(() => {
    if (response.data) {
      onComplete(response.data);
      //ajaxFuncs.stop();
    }
  }, [response]);
  console.log("request", counter, repeatCount);
  let progress = 1;
  let msg = messages[0];
  if (response.data) {
    progress = 2;
    msg = messages[1];
  } else if (repeatCount) {
    if (counter >= repeatCount) {
      progress = 3;
      msg = messages[2];
    }
  } else if (null !== response.fail) {
    progress = 3;
    msg = (
      <span>
        {props.messages[2]} <br /> {response.fail}
      </span>
    );
  }

  return (
    <div>
      <Progress
        status={progress}
        message={msg}
        classes={["stacked", "center", "large"]}
      />
      {3 === progress && (
        <div className="pxq_pgck_btn_retry">
          <button onClick={() => ajaxFuncs.start()}>Retry</button>
        </div>
      )}
    </div>
  );
}
