import { Result, Button } from "antd";

const ErrorPage = ({ title, subtitle, onRetry }) => {
  return (
    <Result
      status="error"
      title={title}
      subTitle={subtitle}
      extra={
        onRetry && (
          <Button type="primary" className="shadow-none" onClick={onRetry}>
            Retry
          </Button>
        )
      }
    />
  );
};

export default ErrorPage;
