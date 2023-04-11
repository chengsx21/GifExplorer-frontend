import { Card, Descriptions, Layout, message } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchImageMetadata } from "../../utils/request";
import { MainFooter } from "../../components/footer";
import { MainHeader } from "../../components/header";
import { ApiError, ImageMetadata } from "../../utils/types";

interface ImageDetailProps {
    id?: number;
}

const ImageDetailCard: React.FC<ImageDetailProps> = (props: ImageDetailProps) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [imageMetadata, setImageMetadata] = useState<ImageMetadata>(null);

    const router = useRouter();
    const query = router.query;

    useEffect(() => {
        if (props.id === undefined) {
            return;
        }
        setLoading(true);
        fetchImageMetadata(props.id)
            .then((data) => {
                setImageMetadata((_) => data);
                setLoading(false);
            })
            .catch((err: ApiError) => {
                message.error(err.localized_message);
                setLoading(false);
            });
    }, [router, query]);

    return (
        <Descriptions title="Image info">
            <Descriptions.Item label="图片 ID">{imageMetadata?.id}</Descriptions.Item>
            <Descriptions.Item label="标题">{imageMetadata?.title}</Descriptions.Item>
            <Descriptions.Item label="上传者">{imageMetadata?.uploader}</Descriptions.Item>
            <Descriptions.Item label="发布时间">{new Date(imageMetadata?.pub_time).toLocaleString()}</Descriptions.Item>
        </Descriptions>
    );
};

const ImageDetailScreen: React.FC = () => {   
    const router = useRouter();
    return (
        <Layout>
            <MainHeader />
            <ImageDetailCard id={router.query.id as unknown as number}/>
            <MainFooter />
        </Layout>
    );
};

export default ImageDetailScreen;