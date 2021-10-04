import { FC } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const CustomResult: FC = () => {
    return (
        <Result
            status="success"
            title="Successfully Registered a New User!"
            subTitle="You can Log in or go to the home page."
            extra={[
            <Link to="/" >
                <Button>
                    Home Page
                </Button>
            </Link> ,
            <Link to="/login">
                <Button type="primary">Log in</Button>
            </Link>,
            ]}
        />
    );
}

export default CustomResult;