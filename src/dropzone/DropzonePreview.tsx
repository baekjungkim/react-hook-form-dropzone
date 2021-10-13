import styled from "styled-components";

const Container = styled.aside`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const PreviewContainer = styled.div`
  display: inline-flex;
  border-radius: 2px;
  border: 1px solid #eaeaea;
  margin-bottom: 8px;
  margin-right: 8px;
  width: 100px;
  height: 100px;
  padding: 4px;
  box-sizing: border-box;
`;

const PreviewInner = styled.div`
  display: flex;
  min-width: 0;
  overflow: hidden;
`;

const Img = styled.img`
  display: block;
  width: auto;
  height: 100%;
`;

const DropzonePreview: React.FC<IDropzonePreviewProps> = ({ src }) => {
  return (
    <Container>
      <PreviewContainer>
        <PreviewInner>
          <Img src={src} alt="preview" />
        </PreviewInner>
      </PreviewContainer>
    </Container>
  );
};

export default DropzonePreview;

interface IDropzonePreviewProps {
  src: string;
}
