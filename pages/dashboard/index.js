import { getLayout as getPageTitleLayout } from 'src/layouts/page-title';
import { getLayout as getMainLayout } from 'src/layouts/main';
import { ConnectedWrapper } from '@celeste-js/react';
import ConnectWallet from 'src/components/commons/connect-wallet';
import WithdrawCard from './withdraw-card';
import SubmitFooter from './dashboard-footer';

const Dashboard = () => {
    return (
        <section className="section has-text-centered has-font-montserrat ">
            <h3 className="subtitle is-size-7-mobile has-text-weight-bold has-text-hamber">
                Welcome to TRAF Dashoard Page
            </h3>

            <div className="container">
                <ConnectedWrapper
                    disconnectedComponent={
                        <div className="content">
                            <p className="subtitle is-size-7-mobile has-text-white has-font-spacegrotesk">
                                In order to view your dashboard, please connect your wallet
                            </p>
                            <ConnectWallet />
                        </div>
                    }
                >
                    <p className="subtitle is-size-7-mobile has-text-white has-font-spacegrotesk">
                        You currently have X staked NFTs
                    </p>
                    <WithdrawCard />
                    <SubmitFooter />
                </ConnectedWrapper>
            </div>
        </section>
    );
};

Dashboard.getLayout = page => getPageTitleLayout(getMainLayout(page), 'Dashboard');
export default Dashboard;
