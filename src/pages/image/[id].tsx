import { Button, Col, Card, Descriptions, Empty, Image, Layout, Row, message, Skeleton, Space } from "antd";
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchImageMetadata } from "../../utils/request";
import { MainFooter } from "../../components/footer";
import { MainHeader } from "../../components/header";
import { Likes } from "../../components/likes";
import { ApiError, ImageMetadata } from "../../utils/types";

interface ImageDetailProps {
    loading: boolean;
    id: number;
    data?: ImageMetadata;
}

const ImageMetadataCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    return (
        <Card title="图片详情" loading={props.loading}>
            {props.data ? (
                <Descriptions column={1}>
                    <Descriptions.Item label="上传者">{props.data.uploader}</Descriptions.Item>
                    <Descriptions.Item label="分辨率">{props.data.width} x {props.data?.height}</Descriptions.Item>
                    <Descriptions.Item label="时长">{props.data.duration} s</Descriptions.Item>
                    <Descriptions.Item label="发布时间">{new Date(props.data.pub_time).toLocaleString()}</Descriptions.Item>
                </Descriptions>
            ) : (
                <Empty description="暂无数据"/>
            )}
        </Card>
    );
};

const ImageContentCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    return (
        <Card
            title={
                <Skeleton active loading={props.loading} title={{ width: "50%" }} paragraph={false}>
                    {props.data?.title}
                </Skeleton>
            }
            extra={
                <Space align="center">
                    <Likes likes={props.data?.like} style={{ paddingRight: "16px" }}/>
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
            bodyStyle={{ minHeight: "250px" }}
            style={{ width: "100%", height: "100%"}}
        >
            <Image
                src={`/api/image/preview/${props.id}`}
                alt={props.loading ? "GIF picture" : props.data?.title}
                height="100%"
                width="100%"
                placeholder={
                    <Skeleton.Image active rootClassName="skeletonImgRoot" style={{width: "100%", height: "200px"}} />
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
        <Layout style={{ minHeight: "100vh" }}>
            <MainHeader />
            <Content style={{ margin: "16px"}}>
                <Row align="top" gutter={16} style={{ height: "100%" }}>
                    <Col span={16} style={{ height: "100%" }}>
                        <ImageContentCard
                            loading={loading}
                            id={query.id as unknown as number}
                            data={imageMetadata}
                        />
                    </Col>
                    <Col span={8}>
                        <ImageMetadataCard
                            loading={loading}
                            id={query.id as unknown as number}
                            data={imageMetadata}
                        />
                    </Col>
                </Row>
            </Content>
            <MainFooter />
        </Layout>
    );
};

export default ImageDetailScreen;