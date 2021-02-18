import { ReactWrapper } from 'enzyme';
import { Link } from 'gatsby';
import * as React from 'react';

import { p as P } from '../Mdx';
import Property, { PropertyType } from './Property';

import styles from './Property.module.scss';

describe('<Property />', () => {
  describe('is linkable', () => {
    const name = 'bar';
    const schemaId = 'foo';
    const propertyId = `${schemaId}__${name}`;
    let component: ReactWrapper;

    beforeAll(() => {
      component = global.mountWithRouter(
        <Property
          name={name}
          schemaId={schemaId}
          services="*"
          type="string"
        />
      );
    });

    it('adds correct `id` to property container', () => {
      expect(component.find(`[id="${propertyId}"]`)).toExist();
    });

    it('has a <Link /> component', () => {
      expect(component.find(Link)).toExist();
    });

    describe('<Link /> component', () => {
      it('has correct `to` value', () => {
        expect(component.find(Link).props().to).toBe(`#${propertyId}`);
      });

      it('has correct text value', () => {
        expect(component.find(Link).text()).toBe(name);
      });
    });
  });

  describe('a description', () => {
    it('is not shown if component has no children', () => {
      const component = global.mountWithRouter(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find(`.${styles.description}`)).not.toExist();
    });

    it('is shown if component has children', () => {
      const component = global.mountWithRouter(
        <Property
          name="foo"
          type="string"
        >
          <P>This is a property!</P>
        </Property>
      );

      expect(component.find(`.${styles.description}`)).toExist();
    });
  });

  describe('an example', () => {
    it('is not shown if `example` property exists', () => {
      const component = global.mountWithRouter(
        <Property
          name="foo"
          type="string"
        />
      );

      expect(component.find(`.${styles.example}`)).not.toExist();
    });

    it('is shown if `example` property exists', () => {
      const component = global.mountWithRouter(
        <Property
          example="foo"
          name="foo"
          type="string"
        />
      );

      expect(component.find(`.${styles.example}`)).toExist();
    });

    it('if `type` is `object`, the `example` value is formatted json', () => {
      const component = global.mountWithRouter(
        <Property
          example={`
            {
              "foo": "bar"
            }
          `}
          name="foo"
          type="object"
        />
      );

      const exampleValue = component.find('Pre')
        .filter(`.${styles['example-value']}`);

      expect(exampleValue.text()).toBe(JSON.stringify({
        foo: 'bar',
      }, null, 2));
    });

    it.each([
      'object',
      'object[]',
    ])(
      'if `type` is `%s`, the `example` value is formatted json',
      (type) => {
        const component = global.mountWithRouter(
          <Property
            example={`
            {
              "foo": "bar"
            }
          `}
            name="foo"
            type={type as PropertyType}
          />
        );

        const exampleValue = component.find('Pre')
          .filter(`.${styles['example-value']}`);

        expect(exampleValue.text()).toBe(JSON.stringify({
          foo: 'bar',
        }, null, 2));
      }
    );

    it.each([
      [
        'boolean',
        'true',
      ],
      [
        'decimal',
        '0.1',
      ],
      [
        'integer',
        '1',
      ],
      [
        'enum',
        'foo',
      ],
      [
        'string',
        'foo',
      ],
    ])(
      'if `type` is `%s`, the `example` value is not formatted',
      (type, example) => {
        const component = global.mountWithRouter(
          <Property
            example={example}
            name="foo"
            type={type as PropertyType}
          />
        );

        const exampleValue = component.find('Pre')
          .filter(`.${styles['example-value']}`);

        expect(exampleValue.text()).toBe(example);
      }
    );
  });

  describe('tags section', () => {
    it(
      // eslint-disable-next-line max-len
      'is not shown if `linkToSchemaName`, `services`, and `tags`  props are undefined',
      () => {
        const component = global.mountWithRouter(
          <Property
            name="foo"
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).not.toExist();
      }
    );

    describe('is shown if', () => {
      it('`linkToSchemaName` is defined', () => {
        const component = global.mountWithRouter(
          <Property
            linkToSchemaName={'Foo'}
            name="foo"
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });

      it('`services` is defined', () => {
        const component = global.mountWithRouter(
          <Property
            name="foo"
            services="*"
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });

      it('`tags` is defined', () => {
        const component = global.mountWithRouter(
          <Property
            name="foo"
            tags={{
              foo: 'foo',
            }}
            type="string"
          />
        );

        expect(component.find(`.${styles.tags}`)).toExist();
      });
    });

    it('lists service tags', () => {
      const component = global.mountWithRouter(
        <Property
          name="foo"
          schemaId="bar"
          services="*"
          type="string"
        />
      );

      expect(component.find('ServiceTags')).toExist();
    });

    describe('schema tags', () => {
      let schemaTags: ReactWrapper;

      beforeAll(() => {
        const component = global.mountWithRouter(
          <Property
            name="foo"
            schemaId="bar"
            services="*"
            tags={{
              bar: 'bar',
              foo: 'foo',
            }}
            type="string"
          />
        );

        schemaTags = component.find('Tag')
          .filter(`.${styles['tags__schema-tag']}`);
      });

      it('are listed', () => {
        expect(schemaTags.length).toBe(2);
      });

      it('text is key / value pairs', () => {
        expect(schemaTags.at(0).text()).toBe('bar: bar');
        expect(schemaTags.at(1).text()).toBe('foo: foo');
      });
    });
  });
});
