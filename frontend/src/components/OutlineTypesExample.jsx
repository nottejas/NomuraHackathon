import Button from 'react-bootstrap/Button';

export const PrimaryButton = (props) => (
  <Button variant="outline-primary" {...props}>{props.children || "Primary"}</Button>
);

export const SecondaryButton = (props) => (
  <Button variant="outline-secondary" {...props}>{props.children || "Secondary"}</Button>
);

export const SuccessButton = (props) => (
  <Button variant="outline-success" {...props}>{props.children || "Success"}</Button>
);

export const WarningButton = (props) => (
  <Button variant="outline-warning" {...props}>{props.children || "Warning"}</Button>
);

export const DangerButton = (props) => (
  <Button variant="outline-danger" {...props}>{props.children || "Danger"}</Button>
);

export const InfoButton = (props) => (
  <Button variant="outline-info" {...props}>{props.children || "Info"}</Button>
);

export const LightButton = (props) => (
  <Button variant="outline-light" {...props}>{props.children || "Light"}</Button>
);

export const DarkButton = (props) => (
  <Button variant="outline-dark" {...props}>{props.children || "Dark"}</Button>
);
