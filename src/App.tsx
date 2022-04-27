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
  const [apiToken, setApiToken] = useState("2DXqRB8ueCyqFkQwszyIVw");
  const [templateSlug, setTemplateSlug] = useState("180");
  const [options, setOptions] = useState<ImporterOptions>({
    env: "development",
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
        <div>
          <div style={{ width: "100px" }}>Api Token:</div>
          <input
            style={{ width: "400px" }}
            value={apiToken}
            onChange={({ target: { value } }) => setApiToken(value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <div style={{ width: "100px" }}>Template Id:</div>
          <input
            style={{ width: "400px" }}
            value={templateSlug}
            onChange={({ target: { value } }) => setTemplateSlug(value)}
          />
        </div>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <div style={{ width: "100px" }}>Environment</div>
          <input
            style={{ width: "400px" }}
            value={options.env || ""}
            onChange={({ target: { value } }) =>
              setOptions((p) => ({ ...p, env: value as EnvironmentType }))
            }
          />
        </div>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <div style={{ width: "800px" }}>Batch Validation Size</div>
          <input
            style={{ width: "400px" }}
            value={options.batchValidationSize || ""}
            onChange={({ target: { value } }) => {
              const batchValidationSize = parseInt(value);
              if (batchValidationSize) {
                setOptions((p) => ({
                  ...p,
                  batchValidationSize,
                }));
              }
            }}
          />
        </div>
        <div style={{ marginTop: "10px", marginBottom: "20px" }}>
          <div style={{ width: "800px" }}>Batch Validation Delay Millis</div>
          <input
            style={{ width: "400px" }}
            value={options.batchValidationDelayMs || ""}
            onChange={({ target: { value } }) => {
              const batchValidationDelayMillis = parseInt(value);
              if (batchValidationDelayMillis) {
                setOptions((p) => ({
                  ...p,
                  batchValidationDelayMs: batchValidationDelayMillis,
                }));
              }
            }}
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
          <button
            onClick={showCDNBasedImporter}
            style={{ marginTop: "80px", height: "60px" }}
          >
            Show CDN based Importer
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
