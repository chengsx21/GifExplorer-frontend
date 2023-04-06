import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Layout, message, Typography } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import md5 from 'md5';
import { userLogin } from '../utils/request';
import { useLocalStorage } from '../utils/hooks';
import { ApiError, UserLocalInfo } from '../utils/types';

const LoginScreen: React.FC = () => {
    // Hooks
    const [form] = Form.useForm();
    const router = useRouter();
    const [userInfo, setUserInfo] = useLocalStorage("userInfo", undefined as UserLocalInfo | undefined);

    // Callbacks
    const onLogin = () => {
        form.validateFields()
            .then((values) => {
                userLogin(values.username, md5(values.password))
                    .then((res) => {
                        setUserInfo(() => res);
                        message.success("登录成功");
                        router.push("/");
                    })
                    .catch((err: ApiError) => {
                        message.error("登录失败：" + err.localized_message);
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
                        忘记密码？
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onLogin}>
                        登录
                    </Button>
                    或 <Link href="/signup"> 现在注册！ </Link>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default LoginScreen;
