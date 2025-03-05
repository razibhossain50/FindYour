import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { SearchLawyerBlock } from '@/blocks/SearchLawyerBlock/Component'
import { RegularUserLoginBlock } from '@/blocks/RegularUserAuth/Login/LoginBlock'
import { RegularUserRegisterBlock } from '@/blocks/RegularUserAuth/Register/RegisterBlock'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  searchLawyerBlock: SearchLawyerBlock,
  regularUserLogin: RegularUserLoginBlock,
  regularUserRegister: RegularUserRegisterBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  console.log('Blocks:', blocks);

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block
          console.log('Rendering block type:', blockType);

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              console.log(`Rendering component for block type: ${blockType}`);
              return (
                <div className="" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          } else {
            console.log(`Block type ${blockType} not found in blockComponents`);
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
