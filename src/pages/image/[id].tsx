import { Layout } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchImageMetadata } from "../../utils/request";
import { MainFooter } from "../../components/footer";
import { MainHeader } from "../../components/header";

interface ImageDetailProps {
    id: number;
}

const ImageDetailContent: React.FC = (props: ImageDetailProps) => {
    return (
        <div>
            <h1>Image detail page</h1>
            <p>Image id: {props.id}</p>
        </div>
    );
};

const ImageDetailScreen: React.FC = () => {   
    const router = useRouter();
    const { id } = router.query;
    return (
        <Layout>
            <MainHeader />
            <ImageDetailContent id={id}/>
            <MainFooter />
        </Layout>
    );
};

export default ImageDetailScreen;