import React from "react";
import FuseImporter from "fuse-importer";

async function fakeBackendValidation(records) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message:
          "Most rows were imported. We found a few errors. Please fix them and re-submit",
        errors: {
          [records[0]._meta.id]: {
            customer_email: "Email is already taken. Emails must be unique.",
          },
        },
      });
    }, 1000);
  });
}

const ImporterButtonComponent = () => {
  function showImporter() {
    const organizationApiKey = "ePdXffYSonkyTFwYBEr_iQ";
    const templateId = "6234946b-3f4e-49f5-b683-4410d4045fd7";
    const importer = new FuseImporter(organizationApiKey, templateId);

    importer.onValidateRecord = async (record) => {
      const errors = {};
      const customerEmail = record["customer_email"];
      if (customerEmail && !customerEmail.endsWith("@flatironsfuse.com")) {
        errors["customer_email"] =
          "The email must ends with @flatironsfuse.com";
      }
      return errors;
    };

    importer.formatRecord = (record) => {
      const newRecord = { ...record };

      // capitalize first letter in customer_name
      if (typeof newRecord.customer_name === "string") {
        newRecord.customer_name =
          newRecord.customer_name.charAt(0).toUpperCase() +
          newRecord.customer_name.slice(1);
      }

      return newRecord;
    };

    importer.onSubmit = async (records) => {
      return await fakeBackendValidation(records);
    };

    importer.show();
  }

  return <button onClick={showImporter}>Show Importer</button>;
};

export default ImporterButtonComponent;
