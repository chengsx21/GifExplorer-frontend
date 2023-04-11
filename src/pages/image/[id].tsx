import { Col, Card, Descriptions, Image, Layout, Row, message, Skeleton } from "antd";
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
            <Descriptions>
                <Descriptions.Item label="图片 ID">{props.id}</Descriptions.Item>
                <Descriptions.Item label="标题">{props?.title}</Descriptions.Item>
                <Descriptions.Item label="上传者">{props?.uploader}</Descriptions.Item>
                <Descriptions.Item label="发布时间">{new Date(props?.createAt).toLocaleString()}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ImageContentCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    return (
        <Card
            title={
                <Skeleton active loading={props.loading} paragraph={false}>
                    {props.title}
                </Skeleton>
            }
            style={{ width: "100%", height: "100%" }}
        >
            <Image
                src={`/api/image/preview/${props.id}`}
                alt={props.loading ? "GIF picture" : props.title}
                placeholder={
                    <Skeleton.Image active />
                }
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
            <Content style={{ margin: "16px" }}>
                <Row align="top" gutter={[16, 16]}>
                    <Col span={16}>
                        <ImageContentCard
                            loading={loading}
                            {...imageMetadata}
                            id={imageMetadata?.id}
                            title={imageMetadata?.title}
                        />
                    </Col>
                    <Col span={8}>
                        <ImageMetadataCard
                            loading={loading}
                            id={imageMetadata?.id}
                            title={imageMetadata?.title}
                            uploader={imageMetadata?.uploader}
                            createAt={imageMetadata?.pub_time}
                        />
                    </Col>
                </Row>
            </Content>
            <MainFooter />
        </Layout>
    );
};

export default ImageDetailScreen;