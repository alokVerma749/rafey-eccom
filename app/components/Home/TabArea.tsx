import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { TabCard } from "./TabCard";
import { Product } from "@/types/product_type";

export function TabArea({ cardDetail }: { cardDetail: Product[] }) {
  const defaultCard = cardDetail[0];

  return (
    <ResizablePanelGroup direction="horizontal" className="max-w-full rounded-lg">
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={50}>
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail[0]} />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <TabCard cardDetail={cardDetail.length > 1 ? cardDetail[1] : defaultCard} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <TabCard cardDetail={cardDetail.length > 2 ? cardDetail[2] : defaultCard} />
          </ResizablePanel>

        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />

      <ResizablePanel defaultSize={50}>
        <TabCard cardDetail={cardDetail.length > 3 ? cardDetail[3] : defaultCard} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
