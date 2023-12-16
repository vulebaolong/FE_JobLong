import {
    MenuButtonBold,
    MenuButtonItalic,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor as RichTextEditorTipTap,
    type RichTextEditorRef,
    MenuButtonUnderline,
    MenuButtonStrikethrough,
    MenuButtonSubscript,
    MenuButtonSuperscript,
    MenuSelectTextAlign,
    MenuButtonOrderedList,
    MenuButtonBulletedList,
} from 'mui-tiptap';
import useExtensions from './useExtensions';
import { forwardRef } from 'react';
import { Box } from '@mui/material';
import { borderRadius } from '@/provider/ThemeRegistry';

interface IProps {
    defaultValue?: string;
}

const RichTextEditor = forwardRef<RichTextEditorRef, IProps>(({ defaultValue = '' }, ref) => {
    const extensions = useExtensions({
        placeholder: 'Add your own content here...',
    });

    return (
        <Box
            sx={{
                '& .MuiTiptap-FieldContainer-root': {
                    borderRadius: borderRadius,
                },
                '& .MuiTiptap-FieldContainer-root .MuiTiptap-RichTextContent-root': {
                    padding: '25px',
                },
            }}
        >
            <RichTextEditorTipTap
                ref={ref}
                extensions={extensions}
                content={defaultValue}
                renderControls={() => (
                    <MenuControlsContainer>
                        <MenuSelectHeading />
                        <MenuDivider />

                        <MenuButtonBold />
                        <MenuButtonItalic />
                        <MenuButtonUnderline />
                        <MenuButtonStrikethrough />
                        <MenuButtonSubscript />
                        <MenuButtonSuperscript />
                        <MenuDivider />

                        <MenuSelectTextAlign />
                        <MenuDivider />

                        <MenuButtonOrderedList />
                        <MenuButtonBulletedList />
                    </MenuControlsContainer>
                )}
            />
        </Box>
    );
});
RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
