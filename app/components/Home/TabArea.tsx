import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TabCard } from "./TabCard";
import { Product } from "@/types/product_type";

export function TabArea({ cardDetail }: { cardDetail: Product }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail} />

              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <TabCard cardDetail={cardDetail} />
          </ResizablePanel>

        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={50}>
        <TabCard cardDetail={cardDetail} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
