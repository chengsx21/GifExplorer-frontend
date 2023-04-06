import { Button, Form, Input, Layout, message, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import md5 from 'md5';
import { userRegister } from '../utils/request';
import { useLocalStorage } from '../utils/hooks';
import { ApiError, UserLocalInfo } from '../utils/types';

const SignupScreen: React.FC = () => {
    // Hooks
    const [form] = Form.useForm();
    const router = useRouter();
    const [userInfo, setUserInfo] = useLocalStorage("userInfo", undefined as UserLocalInfo | undefined);

    // Callbacks
    const onSubmit = () => {
        form.validateFields().then((values) => {
            userRegister(values.username, md5(values.password))
                .then((res) => {
                    setUserInfo(() => res);
                    message.success("注册成功");
                    router.push("/");
                })
                .catch((err: ApiError) => {
                    message.error("注册失败：" + err.localized_message);
                });
        }).catch((err) => {
            message.error("注册失败：请检查输入");
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
                    label="用户名"
                    rules={[{ required: true, message: "请输入用户名" }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码",
                        },
                        {
                            type: "string",
                            min: 6,
                            max: 20,
                            message: "密码长度必须在6-20位之间",
                        },
                        {
                            type: "string",
                            pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/),
                            message: "密码只能且必须包含大小写字母和数字",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="确认密码"
                    rules={[
                        {
                            required: true,
                            message: "请确认密码"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("两次输入的密码不一致"));
                            },
                        }),
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Confirm password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={onSubmit}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default SignupScreen;