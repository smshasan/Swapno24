import React, { Fragment } from 'react'
import data from './MemberBadges'

const CreateMembership = () => {
    return (
        <>
            <div className='container membership_create'>
                <div className='text-center'>
                    <h2>Increase your sales with a Swapno24 Membership!</h2>
                    <p>Memberships create a bigger presence for your business on Bikroy, so you can reach even more customers. Our Membership packages are specifically designed to give you the tools you need to expand your business and increase your sales.  As a member, you will also be receiving our newsletter with powerful tips on how to effectively increase your business on Bikroy.</p>

                    <button>Become a Member</button>
                </div>
                <hr></hr>
                <div >
                    <h2 className='text-center'>Benefits of Membership</h2>
                    <div style={{ display: 'flex' }}>
                        <div style={{ borderRight: '1px solid rgba(0,0,0,.1)', padding: '0 10px' }}>
                            <h3>Post more ads</h3>
                            <p>Post more ads with a membership! Focus on creating good ads that effectively sell your items rather than worrying about ad limits. The more ads you post, the more you sell!

                                Select trusted members with a proven track record may also avail auto-approvals of their ads.</p>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                            <h3>Build trust</h3>
                            <p>With a membership at Bikroy we’re helping building trust to your online shop. Members get a "Member since" note on their ads and shops to show case for how long they have been a trusted member.</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex' }}>
                        <div style={{ borderRight: '1px solid rgba(0,0,0,.1)', padding: '0 10px' }}>
                            <h3>Post more ads</h3>
                            <p>Post more ads with a membership! Focus on creating good ads that effectively sell your items rather than worrying about ad limits. The more ads you post, the more you sell!

                                Select trusted members with a proven track record may also avail auto-approvals of their ads.</p>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                            <h3>Build trust</h3>
                            <p>With a membership at Bikroy we’re helping building trust to your online shop. Members get a "Member since" note on their ads and shops to show case for how long they have been a trusted member.</p>
                        </div>
                    </div>
                    <hr></hr>
                    <div style={{ display: 'flex' }}>
                        <div style={{ borderRight: '1px solid rgba(0,0,0,.1)', padding: '0 10px' }}>
                            <h3>Post more ads</h3>
                            <p>Post more ads with a membership! Focus on creating good ads that effectively sell your items rather than worrying about ad limits. The more ads you post, the more you sell!

                                Select trusted members with a proven track record may also avail auto-approvals of their ads.</p>
                        </div>
                        <div style={{ padding: '0 10px' }}>
                            <h3>Build trust</h3>
                            <p>With a membership at Bikroy we’re helping building trust to your online shop. Members get a "Member since" note on their ads and shops to show case for how long they have been a trusted member.</p>
                        </div>
                    </div>
                    <hr></hr>
                </div>

                <Fragment>
                    <div >
                        <h2 className='text-center'>Special Member Badges</h2>
                        <div className='row'>
                        {
                            data.map((dat, index) => {
                                return <div className='col-lg-3 col-md-3 col-sm-6 col-6' key={index}>
                                    <h3>{dat.title}</h3>
                                    <p>{dat.description}</p>
                                </div>
                            })
                        }
                        </div>
                       
                    </div>

                </Fragment>
            </div>
        </>
    )
}

export default CreateMembership