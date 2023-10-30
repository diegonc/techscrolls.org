import remark from "remark";
import remarkHTML from "remark-html";

const parseMD = (md) => {
  return remark().use(remarkHTML).processSync(md).toString();
};
export default parseMD;
