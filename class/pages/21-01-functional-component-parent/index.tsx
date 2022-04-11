import FunctionalComponentChildPage from "../21-02-functional-component-child";

export default function FunctionalComponentParentPage() {
  return <FunctionalComponentChildPage count={123} />;
  //   return <>{FunctionalComponentChildPage({ count: 123 })}</>;
}
