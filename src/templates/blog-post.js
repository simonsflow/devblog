import React from "react"
import config from "../../data/SiteConfig"
import Layout from '../components/layout'
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

export default function Template ({
    data,
}) {
    const { markdownRemark: post } = data
    return (
        <div className="blog-post-container">
        <Helmet title={`${config.siteTitle} - ${post.frontmatter.title}`} />        
          <Layout sidebar="off">
            <div className="blog-post">
            <Link to="/">Main page <span role="img" aria-label="home">🏡</span></Link>
                <h1>{post.frontmatter.title}</h1>
                <div className="post-info" data-tag={post.frontmatter.tags}>
                <small>{post.frontmatter.readtime} mins read on <span>{"{"}{post.frontmatter.tags}{"}"}</span>
                </small>
                </div>
                <div className="post-preview-subtitle">
                  {post.frontmatter.subtitle}
                </div>
                <div 
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
          </Layout>
        </div>
    )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        path
        title
        subtitle
        tags
        readtime
      }
    }
  }
`
