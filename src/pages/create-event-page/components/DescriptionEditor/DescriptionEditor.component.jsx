import React, { useState } from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

import { Row, Col } from 'react-bootstrap';

import 'react-mde/lib/styles/scss/react-mde-all.scss';
import './DescriptionEditor.styles.scss';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

export const DescriptionEditor = ({ description, handleChange }) => {
  const [selectedTab, setSelectedTab] = useState('write');
  return (
    <Row>
      <Col xs={12}>
        <h2 className="description-editor-header">
          Enter a description for your event.
        </h2>
        <ReactMde
          toolbarCommands={[
            [
              'header',
              'bold',
              'italic',
              'strikethrough',
              'link',
              'quote',
              'unordered-list',
              'ordered-list',
              'checked-list',
            ],
          ]}
          minEditorHeight={60}
          maxEditorHeight={60}
          heightUnits="vh"
          value={description}
          onChange={(v) =>
            handleChange({ target: { name: 'description', value: v } })
          }
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={(markdown) =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </Col>
    </Row>
  );
};
