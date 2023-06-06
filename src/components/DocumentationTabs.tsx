"use client";

import { Tabs } from "@radix-ui/react-tabs";
import { TabsList, TabsTrigger, TabsContent } from "./ui/Tabs";
import SimpleBar from "simplebar-react";
import Code from "./Code";
import { nodejs, python } from "@/helpers/documentation-code";
import "simplebar-react/dist/simplebar.min.css";

const DocumentationTabs = () => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJS</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs">
        <SimpleBar>
          <Code
            code={nodejs}
            language="tsx"
            animated
            animationDelay={200}
            show
          />
        </SimpleBar>
      </TabsContent>
      <TabsContent value="python">
        <SimpleBar>
          <Code
            code={python}
            language="python"
            animated
            animationDelay={200}
            show
          />
        </SimpleBar>
      </TabsContent>
    </Tabs>
  );
};
export default DocumentationTabs;
