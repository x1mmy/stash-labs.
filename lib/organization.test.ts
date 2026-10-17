import assert from 'node:assert/strict';
import { test } from 'node:test';
import { organizationJsonLd } from './organization.ts';

test('organization schema has a contact point and a postal address', () => {
  const contact = organizationJsonLd.contactPoint;
  assert.equal(contact['@type'], 'ContactPoint');
  assert.equal(contact.email, 'team@stashlabs.com.au');
  assert.equal(contact.contactType, 'customer support');
  assert.equal(organizationJsonLd.address['@type'], 'PostalAddress');
  assert.equal(organizationJsonLd.address.addressCountry, 'AU');
  assert.equal(organizationJsonLd.name, 'Stash Labs');
});
