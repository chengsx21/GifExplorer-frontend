import React, { useState } from 'react';
import { Input, Layout, Image, Button } from 'antd';
import { MainHeader } from '../components/header';
import { MainFooter } from '../components/footer';
import { MainSider } from '../components/sider';

const { Content } = Layout;
const { Search } = Input;

// Search box of the index page, consider moving to folder "components" for reusing 
const IndexSearchBox = () => {
    const [searchInput, setSearchInput] = useState<string>("");

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleCommit = () => {
        console.log(searchInput)
    };

    return (
        <Search
            size="large"
            placeholder="输入你感兴趣的内容"
            enterButton="搜索"
            color='#6495ED'
            allowClear
            maxLength={50}
            onSearch={handleCommit}
            onChange={handleInput}
        />
    );
};

// Main content of the index page, with a logo icon and a search box
const IndexContent = () => {
    const contentStyle: React.CSSProperties = {
        minHeight: 600,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    };

    return (
        <Content style={contentStyle}>
            <div style={{ margin: "5% auto" }}>
                <Image
                    width={200}
                    src="https://cdn.jsdelivr.net/gh/saiblo/saiblo-public-cdn@2.7.6/static/favicon.ico"
                    alt=''
                />
            </div>
            <div style={{ maxWidth: 800, width: "100%", margin: "0 auto" }}>
                {IndexSearchBox()}
            </div>
        </Content>
    );
};

const IndexScreen = () => {
    return (
        <Layout className="layout">
            <MainHeader />
            <Layout className="body">
                <MainSider />
                <IndexContent />
            </Layout>
            <MainFooter />
        </Layout>
    );
}

export default IndexScreen;