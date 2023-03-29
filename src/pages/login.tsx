import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, message, Typography } from 'antd';
import md5 from 'md5';
import { request } from '../utils/network';

const LoginScreen = () => {
    // Hooks
    const [form] = Form.useForm();

    // Callbacks
    const onLogin = () => {
        form.validateFields()
            .then((values) => {
                request(
                    '/api/user/login',
                    'POST',
                    {
                        user_name: values.username,
                        password: md5(values.password),
                    }
                )
                    .then((res) => message.success('Login success'))
                    .catch((err) => message.error('Login failed: ' + err));
            })
            .catch ((err) => { });
    };

    // Screen
    const { Title } = Typography;

    return (
        <Layout>
            <Title level={2}>Login</Title>
            <Form
                name="normal_login"
                className="login-form"
                form={form}
                initialValues={{ remember: true }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password?
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onLogin}>
                        Log in
                    </Button>
                    Or <a href="">Register now!</a>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default LoginScreen;
