import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const SearchForm = () => {
  const [searchField, setSearchField] = useState('');
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    setSearchField(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedSearchField = searchField.trim();
    if (trimmedSearchField) {
      history.push(`/search?q=${trimmedSearchField}`);
      setSearchField('');
    }
  };

  return (
    <Form inline onSubmit={handleSubmit}>
      <FormControl
        type="text"
        value={searchField}
        onChange={handleChange}
        placeholder="Search events"
        className="mr-sm-2"
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
};
