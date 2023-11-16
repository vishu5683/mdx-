import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { MDXProvider } from '@mdx-js/react';

const MyH1 = props => <h1 style={{ color: 'tomato' }} {...props} />;
const MyParagraph = props => (
  <p style={{ fontSize: '18px', lineHeight: 1.6 }} {...props} />
);

const components = {
  h1: MyH1,
  p: MyParagraph,
};

const DemoPage = ({ data }) => {
  const { allMdx } = data;

  return (
    <Layout>
      <h1>All MDX Frontmatter</h1>
      <MDXProvider components={components}>
        <div>
          {allMdx.nodes.map(({ frontmatter, body }, index) => (
            <div key={index}>
              <strong>Title:</strong> {frontmatter.title},{' '}
              <strong>Date:</strong> {frontmatter.date},{' '}
              <strong>Slug:</strong> {frontmatter.slug}
           
              {body}
            </div>
          ))}
        </div>
      </MDXProvider>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allMdx {
      nodes {
        frontmatter {
          ...MdxFrontmatter
        }
        body
      }
    }
  }

  fragment MdxFrontmatter on MdxFrontmatter {
    date
    slug
    title
  }
`;

export default DemoPage;
