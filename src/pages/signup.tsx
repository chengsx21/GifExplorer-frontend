import { Button, Checkbox, Form, Input, Layout, message, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { userRegister } from '../utils/request';
import { useLocalStorage } from '../utils/hooks';
import { UserLocalInfo } from '../utils/types';

const SignupScreen: React.FC = () => {
    // Hooks
    const [form] = Form.useForm();
    const router = useRouter();
    const [userInfo, setUserInfo] = useLocalStorage('userInfo', undefined as UserLocalInfo | undefined);

    // Callbacks
    const onSubmit = () => {
        form.validateFields().then((values) => {
            userRegister(values.username, values.password)
                .then((res) => {
                    setUserInfo(() => res);
                    message.success("注册成功");
                    router.push("/");
                })
                .catch((err) => {
                    message.error("注册失败：" + err.localized_message);
                });
            router.push('/');
        });
    };

    // Types
    const { Title } = Typography;

    // Screen
    return (
        <Layout>
            <Title level={2}>Sign Up</Title>
            <Form
                name="normal_signup"
                className="signup-form"
                form={form}
                initialValues={{ remember: true }}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入用户名！" }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: "请输入密码！" }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default SignupScreen;