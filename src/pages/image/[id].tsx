import { Button, Col, Card, Descriptions, Image, Layout, Row, message, Skeleton, Space } from "antd";
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchImageMetadata } from "../../utils/request";
import { MainFooter } from "../../components/footer";
import { MainHeader } from "../../components/header";
import { ApiError, ImageMetadata } from "../../utils/types";

interface ImageDetailProps {
    loading: boolean;
    id: number;
    title?: string;
    uploader?: string;
    createAt?: string;
}

const ImageMetadataCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    return (
        <Card title="图片详情" loading={props.loading}>
            <Descriptions column={1}>
                <Descriptions.Item label="上传者">{props?.uploader}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{props?.createAt}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ImageContentCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    return (
        <Card
            title={
                <Skeleton active loading={props.loading} title={{ width: "50%" }} paragraph={false}>
                    {props.title}
                </Skeleton>
            }
            extra={
                <Space align="center">
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        href={`/api/image/download/${props?.id}`}
                        disabled={props.loading}
                    >
                        下载
                    </Button>
                    <Button type="default" icon={<ShareAltOutlined />}>
                        分享
                    </Button>
                </Space>
            }
            style={{ width: "100%", height: "100%" }}
        >
            <Image
                src={`/api/image/preview/${props.id}`}
                alt={props.loading ? "GIF picture" : props.title}
                height="100%"
                width="100%"
                placeholder={
                    <Skeleton.Image active style={{ width: "100%", height: "100%" }}/>
                }
                onError={() => message.error("图片加载失败")}
            />
        </Card>
    );
};


const ImageDetailScreen: React.FC = () => {   
    const [loading, setLoading] = useState<boolean>(true);
    const [imageMetadata, setImageMetadata] = useState<ImageMetadata>(null);

    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        if (query.id === undefined) {
            return;
        }
        setLoading(true);
        fetchImageMetadata(query.id as unknown as number)
            .then((data) => {
                setImageMetadata((_) => data);
                setLoading(false);
            })
            .catch((err: ApiError) => {
                message.error(err.localized_message);
                setLoading(false);
            });
    }, [router, query]);

    const { Content } = Layout;

    return (
        <Layout>
            <MainHeader />
            <Content style={{ margin: "16px", height: "100vh"}}>
                <Row align="top" gutter={16} style={{ height: "100%" }}>
                    <Col span={16} style={{ height: "100%" }}>
                        <ImageContentCard
                            loading={loading}
                            id={imageMetadata?.id}
                            title={imageMetadata?.title}
                        />
                    </Col>
                    <Col span={8}>
                        <ImageMetadataCard
                            loading={loading}
                            createAt={new Date(imageMetadata?.pub_time).toLocaleString()}
                            {...imageMetadata}
                        />
                    </Col>
                </Row>
            </Content>
            <MainFooter />
        </Layout>
    );
};

export default ImageDetailScreen;