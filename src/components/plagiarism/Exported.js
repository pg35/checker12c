export default function Exported(props) {
  const { state } = props;
  const { scan, app } = state;
  const classes = ["row", "success", "large"];

  return (
    <div className={classes.map((x) => `pxq_pgck_${x}`).join(" ")}>
      Report and PDF are ready
    </div>
  );
}
