import FuseImporter, {
  EnvironmentType,
  Record,
  ImporterOptions,
  ValidationErrors,
} from "fuse-importer";
import React, { useState } from "react";

const onValidateRecord = async (): Promise<ValidationErrors> => {
  return {};
};

const App = () => {
  const [apiToken, setApiToken] = useState("");
  const [templateSlug, setTemplateSlug] = useState("");
  const [options, setOptions] = useState<ImporterOptions>({
    env: "production",
  });

  const showCDNBasedImporter = () => {
    const FuseImporter = (window as any).FuseImporter;
    const importer = new FuseImporter(apiToken, templateSlug, {
      ...options,
    });

    importer.onSubmit = async (reviewedData: Record[]) => {
      console.log({ reviewedData });
      return {
        errors: {},
        message: "Data imported successfully",
      };
    };
    importer.onValidateRecord = onValidateRecord;

    importer.show();
  };

  const showImporter = () => {
    const importer = new FuseImporter(apiToken, templateSlug, {
      ...options,
    });

    importer.onSubmit = async (reviewedData: Record[]) => {
      console.log({ reviewedData });
      return {
        errors: {},
        message: "Data imported successfully",
      };
    };
    importer.onValidateRecord = onValidateRecord;

    importer.show();
  };

  return (
    <>
      <div style={{ fontSize: "14px", margin: "100px" }}>
        <div style={{ marginTop: "10px" }}>
          <h1 style={{ width: "200px" }}>Template Information</h1>
        </div>
        <div>
          <div style={{ width: "200px" }}>Organization Api Token:</div>
          <input
            style={{ width: "400px" }}
            value={apiToken}
            onChange={({ target: { value } }) => setApiToken(value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div style={{ width: "100px" }}>Template ID:</div>
          <input
            style={{ width: "400px" }}
            value={templateSlug}
            onChange={({ target: { value } }) => setTemplateSlug(value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "408px",
          }}
        >
          <button style={{ height: "60px" }} onClick={showImporter}>
            Show Importer
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
