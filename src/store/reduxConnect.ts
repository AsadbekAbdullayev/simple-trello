import { ReactNode, FC as ReactFC } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state: any): any => state;

export default function reduxConnect(WrappedComponent: ReactNode | ReactFC | any, actions: any, state: any = mapStateToProps): any {
    return connect(state, actions, null, { forwardRef: true })(WrappedComponent);
};
