import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, message, Typography } from 'antd';
import md5 from 'md5';
import internal from 'stream';
import { userLogin } from '../utils/request';

// Map message code to message
const messageMap = new Map<number, string>([
    [-1, "未知错误"],
    [4, "用户名或密码错误"],
]);

const LoginScreen = () => {
    // Hooks
    const [form] = Form.useForm();

    // Callbacks
    const onLogin = () => {
        form.validateFields()
            .then((values) => {
                userLogin(values.username, md5(values.password))
                    .then((res) => {
                        res.token && localStorage.setItem("token", res.token);
                        message.success("登录成功");
                    })
                    .catch((err) => {
                        message.error("登录失败：" + messageMap.get(err.code ?? -1));
                    });
            })
            .catch((err) => {});
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
