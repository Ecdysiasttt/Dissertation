/*! JointJS v4.0.1 (2024-02-02) - JavaScript diagramming library


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
// Definitions by:
// Aidan Reel <http://github.com/areel>,
// David Durman <http://github.com/DavidDurman>,
// Ewout Van Gossum <https://github.com/DenEwout>,
// Federico Caselli <https://github.com/CaselIT>,
// Chris Moran <https://github.com/ChrisMoran>
// Michael MacFadden https://github.com/mmacfadden

// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// typings: https://github.com/CaselIT/typings-jointjs

export as namespace joint;

export declare namespace anchors {

    export interface RotateAnchorArguments {
        rotate?: boolean;
    }

    export interface BBoxAnchorArguments extends RotateAnchorArguments {
        dx?: number | string;
        dy?: number | string;
    }

    export interface PaddingAnchorArguments {
        padding?: number;
    }

    export interface MidSideAnchorArguments extends RotateAnchorArguments, PaddingAnchorArguments {

    }

    export interface ModelCenterAnchorArguments {
        dx?: number;
        dy?: number;
    }

    export interface AnchorArgumentsMap {
        'center': BBoxAnchorArguments;
        'top': BBoxAnchorArguments;
        'bottom': BBoxAnchorArguments;
        'left': BBoxAnchorArguments;
        'right': BBoxAnchorArguments;
        'topLeft': BBoxAnchorArguments;
        'topRight': BBoxAnchorArguments;
        'bottomLeft': BBoxAnchorArguments;
        'bottomRight': BBoxAnchorArguments;
        'perpendicular': PaddingAnchorArguments;
        'midSide': MidSideAnchorArguments;
        'modelCenter': ModelCenterAnchorArguments;
        'connectionRatio': linkAnchors.ConnectionLengthAnchorArguments;
        'connectionLength': linkAnchors.ConnectionLengthAnchorArguments;
        'connectionPerpendicular': linkAnchors.ConnectionPerpendicularAnchorArguments;
        'connectionClosest': linkAnchors.ConnectionClosestAnchorArguments;
        [key: string]: { [key: string]: any };
    }

    export type AnchorType = keyof AnchorArgumentsMap;

    export type GenericAnchorArguments<K extends AnchorType> = AnchorArgumentsMap[K];

    export interface GenericAnchor<K extends AnchorType> {
        (
        endView: dia.CellView,
        endMagnet: SVGElement,
        anchorReference: g.Point | SVGElement,
        opt: AnchorArgumentsMap[K],
        endType: string,
        linkView: dia.LinkView
        ): g.Point;
    }

    export interface GenericAnchorJSON<K extends AnchorType> {
        name: K;
        args?: AnchorArgumentsMap[K];
    }

    export type AnchorArguments = GenericAnchorArguments<AnchorType>;

    export type Anchor = GenericAnchor<AnchorType>;

    export type AnchorJSON = GenericAnchorJSON<AnchorType>;

    var center: GenericAnchor<'center'>;
    var top: GenericAnchor<'top'>;
    var bottom: GenericAnchor<'bottom'>;
    var left: GenericAnchor<'left'>;
    var right: GenericAnchor<'right'>;
    var topLeft: GenericAnchor<'topLeft'>;
    var topRight: GenericAnchor<'topRight'>;
    var bottomLeft: GenericAnchor<'bottomLeft'>;
    var bottomRight: GenericAnchor<'bottomRight'>;
    var perpendicular: GenericAnchor<'perpendicular'>;
    var midSide: GenericAnchor<'midSide'>;
}

export declare namespace attributes {

    export interface SVGCoreAttributes {
        'id'?: string;
        'xml:base'?: string;
        'xml:lang'?: string;
        'xml:space'?: string;
        'tabindex'?: number;
    }

    export interface SVGConditionalProcessingAttributes {
        'requiredExtensions'?: boolean;
        'requiredFeatures'?: string;
        'systemLanguage'?: string;
    }

    export interface SVGXLinkAttributes {
        'xlink:href'?: string;
        'xlink:type'?: string;
        'xlink:role'?: string;
        'xlink:arcrole'?: string;
        'xlink:title'?: string;
        'xlink:show'?: string;
        'xlink:actuate'?: string;
    }

    export interface SVGPresentationAttributes {
        'alignment-baseline'?: any;
        'baseline-shift'?: any;
        'clip'?: any;
        'clip-path'?: any;
        'clip-rule'?: any;
        'color'?: any;
        'color-interpolation'?: any;
        'color-interpolation-filters'?: any;
        'color-profile'?: any;
        'color-rendering'?: any;
        'cursor'?: any;
        'direction'?: any;
        'display'?: any;
        'dominant-baseline'?: any;
        'enable-background'?: any;
        'fill'?: any;
        'fill-opacity'?: any;
        'fill-rule'?: any;
        'filter'?: any;
        'flood-color'?: any;
        'flood-opacity'?: any;
        'font-family'?: any;
        'font-size'?: any;
        'font-size-adjust'?: any;
        'font-stretch'?: any;
        'font-style'?: any;
        'font-variant'?: any;
        'font-weight'?: any;
        'glyph-orientation-horizontal'?: any;
        'glyph-orientation-vertical'?: any;
        'image-rendering'?: any;
        'kerning'?: any;
        'letter-spacing'?: any;
        'lighting-color'?: any;
        'marker-end'?: any;
        'marker-mid'?: any;
        'marker-start'?: any;
        'mask'?: any;
        'opacity'?: any;
        'overflow'?: any;
        'pointer-events'?: any;
        'shape-rendering'?: any;
        'stop-color'?: any;
        'stop-opacity'?: any;
        'stroke'?: any;
        'stroke-dasharray'?: any;
        'stroke-dashoffset'?: any;
        'stroke-linecap'?: any;
        'stroke-linejoin'?: any;
        'stroke-miterlimit'?: any;
        'stroke-opacity'?: any;
        'stroke-width'?: any;
        'text-anchor'?: any;
        'text-decoration'?: any;
        'text-rendering'?: any;
        'unicode-bidi'?: any;
        'visibility'?: any;
        'word-spacing'?: any;
        'writing-mode'?: any;
    }

    export interface NativeSVGAttributes extends SVGCoreAttributes, SVGPresentationAttributes, SVGConditionalProcessingAttributes, SVGXLinkAttributes {
        'class'?: string;
        'style'?: any;
        'transform'?: string;
        'externalResourcesRequired'?: boolean;

        [key: string]: any;
    }

    export interface SVGAttributeTextWrap {
        width?: string | number | null;
        height?: string | number | null;
        ellipsis?: boolean | string;
        separator?: string;
        hyphen?: string;
        maxLineCount?: number;
        preserveSpaces?: boolean;
        breakText?: util.BreakTextFunction;
        [key: string]: any;
        /**
         * @deprecated use SVGAttributes.text instead
         **/
        text?: string;
    }

    export interface SVGAttributeProps {
        checked?: boolean;
        disabled?: boolean;
        multiple?: boolean;
        readOnly?: boolean;
        selected?: boolean;
        indeterminate?: boolean;
        contentEditable?: boolean;
        value?: any;
    }

    export interface SVGAttributes extends NativeSVGAttributes {
        // Special attributes
        eol?: string;
        filter?: string | dia.SVGFilterJSON;
        fill?: string | dia.SVGPatternJSON | dia.SVGGradientJSON;
        stroke?: string | dia.SVGPatternJSON | dia.SVGGradientJSON;
        sourceMarker?: dia.SVGMarkerJSON;
        targetMarker?: dia.SVGMarkerJSON;
        vertexMarker?: dia.SVGMarkerJSON;
        props?: SVGAttributeProps;
        text?: string;
        textWrap?: SVGAttributeTextWrap;
        lineHeight?: number | string;
        textPath?: any;
        annotations?: any;
        port?: string | { [key: string]: any };
        style?: { [key: string]: any };
        html?: string;
        ref?: string;
        refX?: string | number;
        refY?: string | number;
        refX2?: string | number;
        refY2?: string | number;
        refDx?: string | number;
        refDy?: string | number;
        refWidth?: string | number;
        refHeight?: string | number;
        refRx?: string | number;
        refRy?: string | number;
        refR?: string | number;
        refRInscribed?: string | number; // alias for refR
        refRCircumscribed?: string | number;
        refCx?: string | number;
        refCy?: string | number;
        refD?: string;
        refDResetOffset?: string; // alias for refD
        refDKeepOffset?: string;
        refPoints?: string;
        refPointsResetOffset?: string; // alias for refPoints
        refPointsKeepOffset?: string;
        resetOffset?: boolean;
        displayEmpty?: boolean;
        xAlignment?: 'middle' | 'right' | number | string;
        yAlignment?: 'middle' | 'bottom' | number | string;
        event?: string;
        magnet?: boolean | string;
        title?: string;
        textVerticalAnchor?: 'bottom' | 'top' | 'middle' | number | string;
        connection?: boolean | { stubs?: number };
        atConnectionLength?: number;
        atConnectionLengthKeepGradient?: number; // alias for atConnectionLength
        atConnectionLengthIgnoreGradient?: number;
        atConnectionRatio?: number;
        atConnectionRatioKeepGradient?: number; // alias for atConnectionRatio
        atConnectionRatioIgnoreGradient?: number;
        magnetSelector?: string;
        highlighterSelector?: string;
        containerSelector?: string;
        // CamelCase variants of native attributes
        alignmentBaseline?: any;
        baselineShift?: any;
        clipPath?: any;
        clipRule?: any;
        colorInterpolation?: any;
        colorInterpolationFilters?: any;
        colorProfile?: any;
        colorRendering?: any;
        dominantBaseline?: any;
        enableBackground?: any;
        fillOpacity?: any;
        fillRule?: any;
        floodColor?: any;
        floodOpacity?: any;
        fontFamily?: any;
        fontSize?: any;
        fontSizeAdjust?: any;
        fontStretch?: any;
        fontStyle?: any;
        fontVariant?: any;
        fontWeight?: any;
        glyphOrientationHorizontal?: any;
        glyphOrientationVertical?: any;
        imageRendering?: any;
        letterSpacing?: any;
        lightingColor?: any;
        markerEnd?: any;
        markerMid?: any;
        markerStart?: any;
        pointerEvents?: any;
        shapeRendering?: any;
        stopColor?: any;
        stopOpacity?: any;
        strokeDasharray?: any;
        strokeDashoffset?: any;
        strokeLinecap?: any;
        strokeLinejoin?: any;
        strokeMiterlimit?: any;
        strokeOpacity?: any;
        strokeWidth?: any;
        textAnchor?: any;
        textDecoration?: any;
        textRendering?: any;
        unicodeBidi?: any;
        wordSpacing?: any;
        writingMode?: any;
        xlinkHref?: string;
        xlinkShow?: string;
        xlinkType?: string;
        xlinkRole?: string;
        xlinkArcrole?: string;
        xlinkTitle?: string;
        xlinkActuate?: string;
        xmlSpace?: string;
        xmlBase?: string;
        xmlLang?: string;
        // Backwards compatibility
        'ref-x'?: string | number;
        'ref-y'?: string | number;
        'ref-dx'?: string | number;
        'ref-dy'?: string | number;
        'ref-width'?: string | number;
        'ref-height'?: string | number;
        'x-alignment'?: 'middle' | 'right' | number | string;
        'y-alignment'?: 'middle' | 'bottom' | number | string;
    }

    export interface SVGTextAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        dx?: string | number;
        dy?: string | number;
        rotate?: string;
        textAnchor?: string;
        textLength?: number;
        lengthAdjust?: string;
        'text-anchor'?: string;
        'text-length'?: number;
        'length-adjust'?: string;
    }

    export interface SVGRectAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        ry?: string | number;
        rx?: string | number;
    }

    export interface SVGCircleAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        r?: string | number;
    }

    export interface SVGEllipseAttributes extends SVGAttributes {
        cx?: string | number;
        cy?: string | number;
        rx?: string | number;
        ry?: string | number;
    }

    export interface SVGPolygonAttributes extends SVGAttributes {
        points?: string;
    }

    export interface SVGPolylineAttributes extends SVGAttributes {
        points?: string;
    }

    export interface SVGImageAttributes extends SVGAttributes {
        x?: string | number;
        y?: string | number;
        width?: string | number;
        height?: string | number;
        preserveAspectRatio?: string;
    }

    export interface SVGPathAttributes extends SVGAttributes {
        d?: string;
        pathLength?: number;
        'path-length'?: number;
    }

    export interface SVGLineAttributes extends SVGAttributes {
        x1?: number | string;
        x2?: number | string;
        y1?: number | string;
        y2?: number | string;
        pathLength?: number;
        'path-length'?: number;
    }
}

export declare namespace config {
    var useCSSSelectors: boolean;
    var classNamePrefix: string;
    var defaultTheme: string;
    var doubleTapInterval: number;
}

export declare namespace connectionPoints {

    export type ConnectionPointAlignment = 'top' | 'bottom' | 'left' | 'right';

    export interface DefaultConnectionPointArguments {
        offset?: number | dia.Point;
    }

    export interface AlignConnectionPointArguments extends DefaultConnectionPointArguments {
        align?: ConnectionPointAlignment | null;
        alignOffset?: number;
    }

    export interface StrokeConnectionPointArguments extends DefaultConnectionPointArguments {
        stroke?: boolean;
    }

    export interface BoundaryConnectionPointArguments extends StrokeConnectionPointArguments {
        selector?: Array<string | number> | string | false;
        precision?: number;
        extrapolate?: boolean;
        sticky?: boolean;
        insideout?: boolean;
    }

    export interface ConnectionPointArgumentsMap {
        'anchor': DefaultConnectionPointArguments;
        'bbox': StrokeConnectionPointArguments;
        'rectangle': StrokeConnectionPointArguments;
        'boundary': BoundaryConnectionPointArguments;
        [key: string]: { [key: string]: any };
    }

    export type ConnectionPointType = keyof ConnectionPointArgumentsMap;

    export type GenericConnectionPointArguments<K extends ConnectionPointType> = ConnectionPointArgumentsMap[K];

    export interface GenericConnectionPoint<K extends ConnectionPointType> {
        (
        endPathSegmentLine: g.Line,
        endView: dia.CellView,
        endMagnet: SVGElement,
        opt: ConnectionPointArgumentsMap[K],
        endType: string,
        linkView: dia.LinkView
        ): g.Point;
    }

    export interface GenericConnectionPointJSON<K extends ConnectionPointType> {
        name: K;
        args?: ConnectionPointArgumentsMap[K];
    }

    export type ConnectionPointArguments = GenericConnectionPointArguments<ConnectionPointType>;

    export type ConnectionPoint = GenericConnectionPoint<ConnectionPointType>;

    export type ConnectionPointJSON = GenericConnectionPointJSON<ConnectionPointType>;

    var anchor: GenericConnectionPoint<'anchor'>;
    var bbox: GenericConnectionPoint<'bbox'>;
    var rectangle: GenericConnectionPoint<'rectangle'>;
    var boundary: GenericConnectionPoint<'boundary'>;
}

export declare namespace connectionStrategies {

    export interface ConnectionStrategy {
        (
        endDefinition: dia.Link.EndJSON,
        endView: dia.CellView,
        endMagnet: SVGElement,
        coords: dia.Point,
        link: dia.Link,
        endType: dia.LinkEnd
        ): dia.Link.EndJSON;
    }

    var useDefaults: ConnectionStrategy;
    var pinAbsolute: ConnectionStrategy;
    var pinRelative: ConnectionStrategy;
}

export declare namespace connectors {

    export interface NormalConnectorArguments {
        raw?: boolean;
    }

    export interface RoundedConnectorArguments {
        raw?: boolean;
        radius?: number;
    }

    export interface SmoothConnectorArguments {
        raw?: boolean;
    }

    export interface JumpOverConnectorArguments {
        raw?: boolean;
        size?: number;
        jump?: 'arc' | 'gap' | 'cubic';
        radius?: number;
    }

    export interface StraightConnectorArguments {
        raw?: boolean;
        cornerType?: 'point' | 'cubic' | 'line' | 'gap';
        cornerRadius?: number;
        cornerPreserveAspectRatio?: boolean;
        precision?: number;
    }

    export enum CurveDirections {
        AUTO = 'auto',
        HORIZONTAL = 'horizontal',
        VERTICAL = 'vertical',
        CLOSEST_POINT = 'closest-point',
        OUTWARDS = 'outwards'
    }

    export enum CurveTangentDirections {
        UP = 'up',
        DOWN = 'down',
        LEFT = 'left',
        RIGHT = 'right',
        AUTO = 'auto',
        CLOSEST_POINT = 'closest-point',
        OUTWARDS = 'outwards'
    }

    export interface CurveConnectorArguments {
        raw?: boolean;
        direction?: CurveDirections;
        sourceDirection?: CurveTangentDirections | dia.Point | number;
        targetDirection?: CurveTangentDirections | dia.Point | number;
        sourceTangent?: dia.Point;
        targetTangent?: dia.Point;
        distanceCoefficient?: number;
        angleTangentCoefficient?: number;
        tension?: number;
        precision?: number;
    }

    export interface ConnectorArgumentsMap {
        'normal': NormalConnectorArguments;
        'rounded': RoundedConnectorArguments;
        'smooth': SmoothConnectorArguments;
        'jumpover': JumpOverConnectorArguments;
        'straight': StraightConnectorArguments;
        'curve': CurveConnectorArguments;
        [key: string]: { [key: string]: any };
    }

    export type ConnectorType = keyof ConnectorArgumentsMap;

    export type GenericConnectorArguments<K extends ConnectorType> = ConnectorArgumentsMap[K];

    export interface GenericConnector<K extends ConnectorType> {
        (
        sourcePoint: dia.Point,
        targetPoint: dia.Point,
        routePoints: dia.Point[],
        args?: GenericConnectorArguments<K>,
        linkView?: dia.LinkView
        ): string | g.Path;
    }

    export interface GenericConnectorJSON<K extends ConnectorType> {
        name: K;
        args?: GenericConnectorArguments<K>;
    }

    export interface CurveConnector extends GenericConnector<'curve'> {
        Directions: typeof CurveDirections;
        TangentDirections: typeof CurveTangentDirections;
    }

    export type ConnectorArguments = GenericConnectorArguments<ConnectorType>;

    export type Connector = GenericConnector<ConnectorType>;

    export type ConnectorJSON = GenericConnectorJSON<ConnectorType>;

    var normal: GenericConnector<'normal'>;
    var rounded: GenericConnector<'rounded'>;
    var smooth: GenericConnector<'smooth'>;
    var jumpover: GenericConnector<'jumpover'>;
    var straight: GenericConnector<'straight'>;
    var curve: CurveConnector;
}

export declare namespace dia {

    export type Event = mvc.TriggeredEvent;

    export type ObjectHash = { [key: string]: any };

    export type Point = g.PlainPoint;

    export type BBox = g.PlainRect;

    export type Size = Pick<BBox, 'width' | 'height'>;

    export type PaddingJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
    };

    export type Padding = number | PaddingJSON;

    export type SidesJSON = {
        left?: number;
        top?: number;
        right?: number;
        bottom?: number;
        horizontal?: number;
        vertical?: number;
    };

    export type LegacyPositionName = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' |
    'topMiddle' | 'bottomMiddle' | 'leftMiddle' | 'rightMiddle' |
    'corner' | 'origin';

    export type PositionName = 'top' | 'left' | 'bottom' | 'right' | 'center' |
    'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' |
    LegacyPositionName;

    export type Sides = number | SidesJSON;

    export type OrthogonalDirection =
    'left' | 'top' | 'right' | 'bottom';

    export type Direction =
    OrthogonalDirection |
    'top-left' | 'top-right' | 'bottom-right' | 'bottom-left';

    export type LinkEnd =
    'source' | 'target';

    export type MarkupNodeJSON = {
        tagName: string;
        selector?: string;
        groupSelector?: string | string[];
        namespaceURI?: string;
        className?: string;
        attributes?: attributes.NativeSVGAttributes;
        style?: { [key: string]: any };
        children?: MarkupJSON;
        textContent?: string;
    };

    export type MarkupJSON = Array<MarkupNodeJSON | string>;

    export type Path = string | Array<string | number>;

    export interface ModelSetOptions extends mvc.ModelSetOptions {
        dry?: boolean;
        isolate?: boolean;
        [key: string]: any;
    }

    export interface CollectionAddOptions extends mvc.AddOptions {
        dry?: boolean;
        [key: string]: any;
    }

    export interface SVGPatternJSON {
        id?: string;
        type: 'pattern';
        attrs?: attributes.NativeSVGAttributes;
        markup: string | MarkupJSON;
    }

    export interface SVGGradientJSON {
        id?: string;
        type: 'linearGradient' | 'radialGradient';
        attrs?: attributes.NativeSVGAttributes;
        stops: Array<{
            offset: number | string;
            color: string;
            opacity?: number;
        }>;
    }

    export type SVGMarkerJSON = SVGComplexMarkerJSON | SVGSimpleMarkerJSON;

    export interface SVGComplexMarkerJSON {
        id?: string;
        markup: string | MarkupJSON;
        attrs?: attributes.NativeSVGAttributes;
    }

    export interface SVGSimpleMarkerJSON extends attributes.NativeSVGAttributes {
        id?: string;
        type?: string;
        /**
         * @deprecated use `attrs` instead
         */
        markerUnits?: string;
    }

    export type SVGFilterJSON =
    util.filter.FilterJSON<'outline'> |
    util.filter.FilterJSON<'highlight'> |
    util.filter.FilterJSON<'blur'> |
    util.filter.FilterJSON<'dropShadow'> |
    util.filter.FilterJSON<'grayscale'> |
    util.filter.FilterJSON<'sepia'> |
    util.filter.FilterJSON<'saturate'> |
    util.filter.FilterJSON<'hueRotate'> |
    util.filter.FilterJSON<'invert'> |
    util.filter.FilterJSON<'brightness'> |
    util.filter.FilterJSON<'contrast'>;

    export namespace Graph {

        export interface Options {
            [key: string]: any;
        }

        export interface ConnectionOptions extends Cell.EmbeddableOptions {
            inbound?: boolean;
            outbound?: boolean;
        }

        export interface ExploreOptions extends ConnectionOptions {
            breadthFirst?: boolean;
        }

        export class Cells extends mvc.Collection<Cell> {
            graph: Graph;
            cellNamespace: any;
        }

        export interface Attributes {
            cells?: Cells;
            [key: string]: any;
        }
    }

    export class Graph<A extends ObjectHash = Graph.Attributes, S = dia.ModelSetOptions> extends mvc.Model<A, S> {

        constructor(attributes?: Graph.Attributes, opt?: { cellNamespace?: any, cellModel?: typeof Cell });

        addCell(cell: Cell.JSON | Cell, opt?: CollectionAddOptions): this;
        addCell(cell: Array<Cell | Cell.JSON>, opt?: CollectionAddOptions): this;

        addCells(cells: Array<Cell | Cell.JSON>, opt?: CollectionAddOptions): this;

        resetCells(cells: Array<Cell | Cell.JSON>, opt?: Graph.Options): this;

        getCell(id: Cell.ID | Cell): Cell;

        getElements(): Element[];

        getLinks(): Link[];

        getCells(): Cell[];

        getFirstCell(): Cell | undefined;

        getLastCell(): Cell | undefined;

        getConnectedLinks(cell: Cell, opt?: Graph.ConnectionOptions): Link[];

        disconnectLinks(cell: Cell, opt?: S): void;

        removeLinks(cell: Cell, opt?: Cell.DisconnectableOptions): void;

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        cloneCells(cells: Cell[]): { [id: string]: Cell };

        getSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): Cell[];

        cloneSubgraph(cells: Cell[], opt?: Cell.EmbeddableOptions): { [id: string]: Cell };

        dfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        bfs(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ConnectionOptions): void;

        search(element: Element, iteratee: (element: Element, distance: number) => boolean, opt?: Graph.ExploreOptions): void;

        getSuccessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        getPredecessors(element: Element, opt?: Graph.ExploreOptions): Element[];

        isSuccessor(elementA: Element, elementB: Element): boolean;

        isPredecessor(elementA: Element, elementB: Element): boolean;

        isSource(element: Element): boolean;

        isSink(element: Element): boolean;

        getSources(): Element[];

        getSinks(): Element[];

        getNeighbors(element: Element, opt?: Graph.ConnectionOptions): Element[];

        isNeighbor(elementA: Element, elementB: Element, opt?: Graph.ConnectionOptions): boolean;

        getCommonAncestor(...cells: Cell[]): Element | undefined;

        toJSON(): any;

        fromJSON(json: any, opt?: S): this;

        clear(opt?: { [key: string]: any }): this;

        findModelsFromPoint(p: Point): Element[];

        findModelsInArea(rect: BBox, opt?: { strict?: boolean }): Element[];

        findModelsUnderElement(element: Element, opt?: { searchBy?: 'bbox' | PositionName }): Element[];

        getBBox(): g.Rect | null;

        getCellsBBox(cells: Cell[], opt?: Cell.EmbeddableOptions): g.Rect | null;

        hasActiveBatch(name?: string | string[]): boolean;

        maxZIndex(): number;

        minZIndex(): number;

        removeCells(cells: Cell[], opt?: Cell.DisconnectableOptions): this;

        resize(width: number, height: number, opt?: S): this;

        resizeCells(width: number, height: number, cells: Cell[], opt?: S): this;

        startBatch(name: string, data?: { [key: string]: any }): this;

        stopBatch(name: string, data?: { [key: string]: any }): this;
    }

    // dia.Cell

    export namespace Cell {

        export type ID = string | number;

        export interface GenericAttributes<T> {
            attrs?: T;
            z?: number;
            [key: string]: any;
        }

        export interface Selectors {
            [selector: string]: attributes.SVGAttributes | undefined;
        }

        export interface Attributes extends GenericAttributes<Selectors> {
        }

        export type JSON<K extends Selectors = Selectors, T extends GenericAttributes<K> = GenericAttributes<K>> = T & {
            [attribute in keyof T]: T[attribute];
        } & {
            id: ID;
            type: string;
        };

        export interface Constructor<T extends mvc.Model> {
            new(opt?: { id?: ID, [key: string]: any }): T;
            define(type: string, defaults?: any, protoProps?: any, staticProps?: any): dia.Cell.Constructor<T>;
        }

        export interface Options {
            [key: string]: any;
        }

        export interface EmbeddableOptions<T = boolean> extends Options {
            deep?: T;
        }

        export interface DisconnectableOptions extends Options {
            disconnectLinks?: boolean;
        }

        export interface GetEmbeddedCellsOptions extends EmbeddableOptions {
            breadthFirst?: boolean;
            sortSiblings?: boolean;
        }

        export interface ToFrontAndBackOptions extends GetEmbeddedCellsOptions {
            foregroundEmbeds?: boolean;
        }

        export interface TransitionOptions extends Options {
            delay?: number;
            duration?: number;
            timingFunction?: util.timing.TimingFunction;
            valueFunction?: util.interpolate.InterpolateFunction<any>;
        }

        export interface ConstructorOptions extends Graph.Options {
            mergeArrays?: boolean;
        }
    }

    export class Cell<A extends ObjectHash = Cell.Attributes, S extends mvc.ModelSetOptions = dia.ModelSetOptions> extends mvc.Model<A, S> {

        constructor(attributes?: A, opt?: Cell.ConstructorOptions);

        id: Cell.ID;
        graph: Graph;
        markup: string | MarkupJSON;
        useCSSSelectors: boolean;

        protected generateId(): string | number;

        protected stopPendingTransitions(path?: string, delim?: string): void;

        protected stopScheduledTransitions(path?: string, delim?: string): void;

        toJSON(): Cell.JSON<any, A>;

        remove(opt?: Cell.DisconnectableOptions): this;

        toFront(opt?: Cell.ToFrontAndBackOptions): this;

        toBack(opt?: Cell.ToFrontAndBackOptions): this;

        parent(): string;

        getParentCell(): Cell | null;

        getAncestors(): Cell[];

        getEmbeddedCells(opt?: Cell.GetEmbeddedCellsOptions): Cell[];

        isEmbeddedIn(cell: Cell, opt?: Cell.EmbeddableOptions): boolean;

        isEmbedded(): boolean;

        prop(key: Path): any;
        prop(object: Partial<A>, opt?: Cell.Options): this;
        prop(key: Path, value: any, opt?: Cell.Options): this;

        removeProp(path: Path, opt?: Cell.Options): this;

        attr(key?: Path): any;
        attr(object: Cell.Selectors, opt?: Cell.Options): this;
        attr(key: Path, value: any, opt?: Cell.Options): this;

        clone(): this;
        clone(opt: Cell.EmbeddableOptions<false>): this;
        clone(opt: Cell.EmbeddableOptions<true>): Cell[];

        removeAttr(path: Path, opt?: Cell.Options): this;

        transition(path: string, value?: any, opt?: Cell.TransitionOptions, delim?: string): number;

        getTransitions(): string[];

        stopTransitions(path?: string, delim?: string): this;

        embed(cell: Cell | Cell[], opt?: Graph.Options): this;

        unembed(cell: Cell | Cell[], opt?: Graph.Options): this;

        canEmbed(cell: Cell | Cell[]): boolean;

        addTo(graph: Graph, opt?: Graph.Options): this;

        findView(paper: Paper): CellView;

        isLink(): this is Link;

        isElement(): this is Element;

        startBatch(name: string, opt?: Graph.Options): this;

        stopBatch(name: string, opt?: Graph.Options): this;

        position(): g.Point;

        z(): number;

        angle(): number;

        getBBox(): g.Rect;

        getPointFromConnectedLink(link: dia.Link, endType: dia.LinkEnd): g.Point;

        getPointRotatedAroundCenter(angle: number, x: number, y: number): g.Point;
        getPointRotatedAroundCenter(angle: number, point: dia.Point): g.Point;

        getRelativePointFromAbsolute(x: number, y: number): g.Point;
        getRelativePointFromAbsolute(absolutePoint: dia.Point): g.Point;

        getAbsolutePointFromRelative(x: number, y: number): g.Point;
        getAbsolutePointFromRelative(relativePoint: dia.Point): g.Point;

        getChangeFlag(attributes: { [key: string]: number }): number;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Cell>;

        /**
         * @deprecated
         */
        protected processPorts(): void;
    }

    // dia.Element

    export namespace Element {

        export interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            markup?: string | MarkupJSON;
            position?: Point;
            size?: Size;
            angle?: number;
            ports?: {
                groups?: { [key: string]: PortGroup };
                items?: Port[];
            };
        }

        export interface Attributes extends GenericAttributes<Cell.Selectors> {
        }

        export type PortPositionCallback = (ports: Port[], bbox: g.Rect) => dia.Point[];

        export interface PortPositionJSON {
            name?: string;
            args?: { [key: string]: any };
        }

        export type PositionType = string | PortPositionCallback | PortPositionJSON;

        export interface PortGroup {
            position?: PositionType;
            markup?: string | MarkupJSON;
            attrs?: Cell.Selectors;
            label?: {
                markup?: string | MarkupJSON;
                position?: PositionType;
            };
        }

        export interface Port {
            id?: string;
            markup?: string | MarkupJSON;
            group?: string;
            attrs?: Cell.Selectors;
            args?: { [key: string]: any };
            label?: {
                markup?: string | MarkupJSON;
                position?: PositionType;
            };
            z?: number | 'auto';
        }

        export interface PortPosition extends Point {
            angle: number;
        }

        export interface TranslateOptions extends Cell.Options {
            restrictedArea?: BBox | Paper.PointConstraintCallback;
            transition?: Cell.TransitionOptions;
        }

        export interface PositionOptions extends TranslateOptions {
            parentRelative?: boolean;
            deep?: boolean;
        }

        export interface BBoxOptions extends Cell.EmbeddableOptions {
            rotate?: boolean;
        }
    }

    export class Element<A extends ObjectHash = Element.Attributes, S extends mvc.ModelSetOptions = dia.ModelSetOptions> extends Cell<A, S> {

        translate(tx: number, ty?: number, opt?: Element.TranslateOptions): this;

        position(opt?: Element.PositionOptions): g.Point;
        position(x: number, y: number, opt?: Element.PositionOptions): this;

        size(): Size;
        size(width: number, height?: number, opt?: { direction?: Direction, [key: string]: any }): this;

        resize(width: number, height: number, opt?: { direction?: Direction, [key: string]: any }): this;

        rotate(deg: number, absolute?: boolean, origin?: Point, opt?: { [key: string]: any }): this;

        angle(): number;

        scale(scaleX: number, scaleY: number, origin?: Point, opt?: { [key: string]: any }): this;

        fitEmbeds(opt?: { deep?: boolean, padding?: Padding, expandOnly?: boolean, shrinkOnly?: boolean }): this;
        fitToChildren(opt?: { deep?: boolean, padding?: Padding, expandOnly?: boolean, shrinkOnly?: boolean }): this;

        fitParent(opt?: { deep?: boolean, padding?: Padding, expandOnly?: boolean, shrinkOnly?: boolean, terminator?: Cell | Cell.ID }): this;

        getBBox(opt?: Element.BBoxOptions): g.Rect;

        addPort(port: Element.Port, opt?: S): this;

        addPorts(ports: Element.Port[], opt?: S): this;

        insertPort(before: number | string | Element.Port, port: Element.Port, opt?: S): this;

        removePort(port: string | Element.Port, opt?: S): this;

        removePorts(opt?: S): this;
        removePorts(ports: Array<Element.Port | string>, opt?: S): this;

        hasPorts(): boolean;

        hasPort(id: string): boolean;

        getPorts(): Element.Port[];

        getGroupPorts(groupName: string): Element.Port[];

        getPort(id: string): Element.Port;

        getPortsPositions(groupName: string): { [id: string]: Element.PortPosition };

        getPortIndex(port: string | Element.Port): number;

        portProp(portId: string, path: dia.Path): any;

        portProp(portId: string, path: dia.Path, value?: any, opt?: S): Element;

        protected generatePortId(): string | number;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Element>;
    }

    // dia.Link

    export namespace Link {

        export interface EndCellArgs {
            magnet?: string;
            selector?: string;
            port?: string;
            anchor?: anchors.AnchorJSON;
            connectionPoint?: connectionPoints.ConnectionPointJSON;
            priority?: boolean;
        }

        export interface EndJSON extends EndCellArgs {
            id?: Cell.ID;
            x?: number;
            y?: number;
        }

        export interface GenericAttributes<T> extends Cell.GenericAttributes<T> {
            source?: EndJSON;
            target?: EndJSON;
            labels?: Label[];
            vertices?: Point[];
            router?: routers.Router | routers.RouterJSON;
            connector?: connectors.Connector | connectors.ConnectorJSON;
        }

        export interface LinkSelectors extends Cell.Selectors {
            '.connection'?: attributes.SVGPathAttributes;
            '.connection-wrap'?: attributes.SVGPathAttributes;
            '.marker-source'?: attributes.SVGPathAttributes;
            '.marker-target'?: attributes.SVGPathAttributes;
            '.labels'?: attributes.SVGAttributes;
            '.marker-vertices'?: attributes.SVGAttributes;
            '.marker-arrowheads'?: attributes.SVGAttributes;
            '.link-tools'?: attributes.SVGAttributes;
        }

        export interface Attributes extends Cell.GenericAttributes<LinkSelectors> {
        }

        export interface LabelPosition {
            distance?: number; // optional for default labels
            offset?: number | { x: number, y: number };
            angle?: number;
            args?: LinkView.LabelOptions;
        }

        export interface Label {
            markup?: string | MarkupJSON;
            position?: LabelPosition | number; // optional for default labels
            attrs?: Cell.Selectors;
            size?: Size;
        }

        export interface Vertex extends Point {
            [key: string]: any;
        }
    }

    export class Link<A extends ObjectHash = Link.Attributes, S extends mvc.ModelSetOptions = dia.ModelSetOptions> extends Cell<A, S> {

        toolMarkup: string;
        doubleToolMarkup?: string;
        vertexMarkup: string;
        arrowHeadMarkup: string;
        defaultLabel?: Link.Label; // default label props
        /**
         * @deprecated use `defaultLabel.markup` instead
         */
        labelMarkup?: string | MarkupJSON; // default label markup

        disconnect(): this;

        source(): Link.EndJSON;
        source(source: Link.EndJSON, opt?: S): this;
        source(source: Cell, args?: Link.EndCellArgs, opt?: S): this;

        target(): Link.EndJSON;
        target(target: Link.EndJSON, opt?: S): this;
        target(target: Cell, args?: Link.EndCellArgs, opt?: S): this;

        router(): routers.Router | routers.RouterJSON | null;
        router(router: routers.Router | routers.RouterJSON, opt?: S): this;
        router(name: routers.RouterType, args?: routers.RouterArguments, opt?: S): this;

        connector(): connectors.Connector | connectors.ConnectorJSON | null;
        connector(connector: connectors.Connector | connectors.ConnectorJSON, opt?: S): this;
        connector(name: connectors.ConnectorType, args?: connectors.ConnectorArguments, opt?: S): this;

        label(index?: number): Link.Label;
        label(index: number, label: Link.Label, opt?: S): this;

        labels(): Link.Label[];
        labels(labels: Link.Label[], opt?: S): this;

        hasLabels(): boolean;

        insertLabel(index: number, label: Link.Label, opt?: S): Link.Label[];

        appendLabel(label: Link.Label, opt?: S): Link.Label[];

        removeLabel(index?: number, opt?: S): Link.Label[];

        vertex(index?: number): Link.Vertex;
        vertex(index: number, vertex: Link.Vertex, opt?: S): this;

        vertices(): Link.Vertex[];
        vertices(vertices: Link.Vertex[], opt?: S): this;

        insertVertex(index: number, vertex: Link.Vertex, opt?: S): Link.Vertex[];

        removeVertex(index?: number, opt?: S): Link.Vertex[];

        reparent(opt?: S): Element;

        getSourceElement(): null | Element;

        getTargetElement(): null | Element;

        getSourceCell(): null | Cell;

        getTargetCell(): null | Cell;

        getPolyline(): g.Polyline;

        getSourcePoint(): g.Point;

        getTargetPoint(): g.Point;

        getBBox(): g.Rect;

        hasLoop(opt?: Cell.EmbeddableOptions): boolean;

        getRelationshipAncestor(): undefined | Element;

        isRelationshipEmbeddedIn(cell: Cell): boolean;

        applyToPoints(fn: (p: Point) => Point, opt?: S): this;

        scale(sx: number, sy: number, origin?: Point, opt?: S): this;

        translate(tx: number, ty: number, opt?: S): this;

        static define(type: string, defaults?: any, protoProps?: any, staticProps?: any): Cell.Constructor<Link>;
    }

    // dia.CellView

    export namespace CellView {

        export enum Highlighting {
            DEFAULT = 'default',
            EMBEDDING = 'embedding',
            CONNECTING = 'connecting',
            MAGNET_AVAILABILITY = 'magnetAvailability',
            ELEMENT_AVAILABILITY = 'elementAvailability'
        }

        export interface EventHighlightOptions {
            partial: boolean;
            type: Highlighting;
            [key: string]: any;
        }

        export interface Options<T extends Cell> extends mvc.ViewOptions<T, SVGElement> {
            id?: string;
        }

        export interface InteractivityOptions extends ElementView.InteractivityOptions, LinkView.InteractivityOptions {

        }

        export type FlagLabel = string | string[];
        export type PresentationAttributes = { [key: string]: FlagLabel };

        export type NodeData = { [key: string]: any };

        export type NodeMetrics = {
            data: NodeData;
            boundingRect: g.Rect;
            magnetMatrix: SVGMatrix;
            geometryShape: g.Shape;
        };
    }

    export abstract class CellViewGeneric<T extends Cell> extends mvc.View<T, SVGElement> {

        constructor(opt?: CellView.Options<T>);

        paper: Paper | null;

        initFlag(): CellView.FlagLabel;

        presentationAttributes(): CellView.PresentationAttributes;

        highlight(el?: mvc.$SVGElement, opt?: { [key: string]: any }): this;

        unhighlight(el?: mvc.$SVGElement, opt?: { [key: string]: any }): this;

        can(feature: string): boolean;

        findMagnet(el: mvc.$SVGElement): SVGElement | undefined;

        findNode(selector: string): SVGElement | HTMLElement | null;

        findNodes(groupSelector: string): Array<SVGElement | HTMLElement>;

        findProxyNode(el: SVGElement | null, type: string): SVGElement;

        getSelector(el: SVGElement, prevSelector?: string): string;

        notify(eventName: string, ...eventArguments: any[]): void;

        addTools(tools: dia.ToolsView): this;

        hasTools(name?: string): boolean;

        removeTools(): this;

        showTools(): this;

        hideTools(): this;

        updateTools(opt?: { [key: string]: any }): this;

        mountTools(): this;

        unmountTools(): this;

        getNodeMatrix(node: SVGElement): SVGMatrix;

        getNodeRotateMatrix(node: SVGElement): SVGMatrix;

        getNodeBoundingRect(node: SVGElement): g.Rect;

        getBBox(opt?: { useModelGeometry?: boolean }): g.Rect;

        getNodeBBox(node: SVGElement): g.Rect;

        getNodeUnrotatedBBox(node: SVGElement): g.Rect;

        isNodeConnection(node: SVGElement): boolean;

        getEventTarget(evt: dia.Event, opt?: { fromPoint?: boolean }): Element;

        checkMouseleave(evt: dia.Event): void;

        getFlag(label: CellView.FlagLabel): number;

        requestUpdate(flags: number, opt?: { [key: string]: any }): void;

        dragLinkStart(evt: dia.Event, magnet: SVGElement, x: number, y: number): void;

        dragLink(evt: dia.Event, x: number, y: number): void;

        dragLinkEnd(evt: dia.Event, x: number, y: number): void;

        preventDefaultInteraction(evt: dia.Event): void;

        isDefaultInteractionPrevented(evt: dia.Event): boolean;

        protected findBySelector(selector: string, root?: SVGElement): SVGElement[];

        protected removeHighlighters(): void;

        protected updateHighlighters(): void;

        protected transformHighlighters(): void;

        protected hasFlag(flags: number, label: CellView.FlagLabel): boolean;

        protected removeFlag(flags: number, label: CellView.FlagLabel): number;

        protected setFlags(): void;

        protected onToolEvent(eventName: string): void;

        protected pointerdblclick(evt: dia.Event, x: number, y: number): void;

        protected pointerclick(evt: dia.Event, x: number, y: number): void;

        protected contextmenu(evt: dia.Event, x: number, y: number): void;

        protected pointerdown(evt: dia.Event, x: number, y: number): void;

        protected pointermove(evt: dia.Event, x: number, y: number): void;

        protected pointerup(evt: dia.Event, x: number, y: number): void;

        protected mouseover(evt: dia.Event): void;

        protected mouseout(evt: dia.Event): void;

        protected mouseenter(evt: dia.Event): void;

        protected mouseleave(evt: dia.Event): void;

        protected mousewheel(evt: dia.Event, x: number, y: number, delta: number): void;

        protected onevent(evt: dia.Event, eventName: string, x: number, y: number): void;

        protected onmagnet(evt: dia.Event, x: number, y: number): void;

        protected getLinkEnd(magnet: SVGElement, x: number, y: number, link: dia.Link, endType: dia.LinkEnd): dia.Link.EndJSON;

        protected getMagnetFromLinkEnd(end: dia.Link.EndJSON): SVGElement;

        protected customizeLinkEnd(end: dia.Link.EndJSON, magnet: SVGElement, x: number, y: number, link: dia.Link, endType: dia.LinkEnd): dia.Link.EndJSON;

        protected addLinkFromMagnet(magnet: SVGElement, x: number, y: number): LinkView;

        protected cleanNodesCache(): void;

        protected nodeCache(magnet: SVGElement): CellView.NodeMetrics;

        protected getNodeData(magnet: SVGElement): CellView.NodeData;

        protected getNodeShape(magnet: SVGElement): g.Shape;

        protected onMount(isInitialMount: boolean): void;

        protected onDetach(): void;

        static addPresentationAttributes(attributes: CellView.PresentationAttributes): CellView.PresentationAttributes;

        static evalAttribute(attrName: string, attrValue: any, refBBox: dia.BBox): any;
    }

    export class CellView extends CellViewGeneric<Cell> {

    }

    // dia.ElementView


    export namespace ElementView {

        export enum Flags {
            UPDATE = 'UPDATE',
            TRANSLATE = 'TRANSLATE',
            TOOLS = 'TOOLS',
            RESIZE = 'RESIZE',
            PORTS = 'PORTS',
            ROTATE = 'ROTATE',
            RENDER = 'RENDER'
        }

        export interface InteractivityOptions {
            elementMove?: boolean;
            addLinkFromMagnet?: boolean;
            stopDelegation?: boolean;
        }
    }

    export class ElementView extends CellViewGeneric<Element> {

        update(element?: Element, renderingOnlyAttrs?: { [key: string]: any }): void;

        setInteractivity(value: boolean | ElementView.InteractivityOptions): void;

        getDelegatedView(): ElementView | null;

        findPortNode(portId: string | number): SVGElement | null;
        findPortNode(portId: string | number, selector: string): Element | null;

        findPortNodes(portId: string | number, groupSelector: string): Element[];

        protected renderMarkup(): void;

        protected renderJSONMarkup(markup: MarkupJSON): void;

        protected renderStringMarkup(markup: string): void;

        protected updateTransformation(): void;

        protected resize(): void;

        protected translate(): void;

        protected rotate(): void;

        protected getTranslateString(): string;

        protected getRotateString(): string;

        protected dragStart(evt: dia.Event, x: number, y: number): void;

        protected dragMagnetStart(evt: dia.Event, x: number, y: number): void;

        protected drag(evt: dia.Event, x: number, y: number): void;

        protected dragMagnet(evt: dia.Event, x: number, y: number): void;

        protected dragEnd(evt: dia.Event, x: number, y: number): void;

        protected dragMagnetEnd(evt: dia.Event, x: number, y: number): void;

        protected prepareEmbedding(data: any): void;

        protected processEmbedding(data: any, evt: dia.Event, x: number, y: number): void;

        protected clearEmbedding(data: any): void;

        protected finalizeEmbedding(data: any): void;
    }

    // dia.LinkView


    export namespace LinkView {

        export enum Flags {
            RENDER = 'RENDER',
            UPDATE = 'UPDATE',
            TOOLS = 'TOOLS',
            LEGACY_TOOLS = 'LEGACY_TOOLS',
            LABELS = 'LABELS',
            VERTICES = 'VERTICES',
            SOURCE = 'SOURCE',
            TARGET = 'TARGET',
            CONNECTOR = 'CONNECTOR'
        }

        export interface InteractivityOptions {
            labelMove?: boolean;
            linkMove?: boolean;
        }

        export interface LabelOptions extends Cell.Options {
            absoluteDistance?: boolean;
            reverseDistance?: boolean;
            absoluteOffset?: boolean;
            keepGradient?: boolean;
            ensureLegibility?: boolean;
        }

        export interface VertexOptions extends Cell.Options {

        }

        export interface Options extends mvc.ViewOptions<Link, SVGElement> {
            labelsLayer?: Paper.Layers | string | false;
        }
    }

    export class LinkView extends CellViewGeneric<Link> {

        options: LinkView.Options;
        sourceAnchor: g.Point;
        targetAnchor: g.Point;

        sendToken(token: SVGElement, duration?: number, callback?: () => void): void;
        sendToken(token: SVGElement, opt?: { duration?: number, direction?: string, connection?: string }, callback?: () => void): void;

        addLabel(coordinates: Point, opt?: LinkView.LabelOptions): number;
        addLabel(coordinates: Point, angle: number, opt?: LinkView.LabelOptions): number;
        addLabel(x: number, y: number, opt?: LinkView.LabelOptions): number;
        addLabel(x: number, y: number, angle: number, opt?: LinkView.LabelOptions): number;

        addVertex(coordinates: Point, opt?: LinkView.VertexOptions): number;
        addVertex(x: number, y: number, opt?: LinkView.VertexOptions): number;

        getConnection(): g.Path;

        getSerializedConnection(): string;

        getConnectionSubdivisions(): g.Curve[][];

        getConnectionLength(): number;

        getPointAtLength(length: number): g.Point;

        getPointAtRatio(ratio: number): g.Point;

        getTangentAtLength(length: number): g.Line;

        getTangentAtRatio(ratio: number): g.Line;

        getClosestPoint(point: Point): g.Point;

        getClosestPointLength(point: Point): number;

        getClosestPointRatio(point: Point): number;

        getLabelPosition(x: number, y: number, opt?: LinkView.LabelOptions): Link.LabelPosition;
        getLabelPosition(x: number, y: number, angle: number, opt?: LinkView.LabelOptions): Link.LabelPosition;

        getLabelCoordinates(labelPosition: Link.LabelPosition): g.Point;

        getVertexIndex(x: number, y: number): number;
        getVertexIndex(point: Point): number;

        update(): this;

        translate(tx: number, ty: number): void;

        requestConnectionUpdate(opt?: { [key: string]: any }): void;

        setInteractivity(value: boolean | LinkView.InteractivityOptions): void;

        getEndView(endType: dia.LinkEnd): dia.CellView | null;

        getEndAnchor(endType: dia.LinkEnd): g.Point;

        getEndConnectionPoint(endType: dia.LinkEnd): g.Point;

        getEndMagnet(endType: dia.LinkEnd): SVGElement | null;

        findLabelNode(labelIndex: string | number): SVGElement | null;
        findLabelNode(labelIndex: string | number, selector: string): Element | null;

        findLabelNodes(labelIndex: string | number, groupSelector: string): Element[];

        removeRedundantLinearVertices(opt?: dia.ModelSetOptions): number;

        protected updateRoute(): void;

        protected updatePath(): void;

        protected updateDOM(): void;

        protected onLabelsChange(link: Link, labels: Link.Label[], opt: { [key: string]: any }): void;

        protected onToolsChange(link: Link, toolsMarkup: string, opt: { [key: string]: any }): void;

        protected onVerticesChange(link: Link, vertices: Point[], opt: { [key: string]: any }): void;

        protected onSourceChange(element: Element, sourceEnd: any, opt: { [key: string]: any }): void;

        protected onTargetChange(element: Element, targetEnd: any, opt: { [key: string]: any }): void;

        protected onlabel(evt: dia.Event, x: number, y: number): void;

        protected dragLabelStart(evt: dia.Event, x: number, y: number): void;

        protected dragArrowheadStart(evt: dia.Event, x: number, y: number): void;

        protected dragStart(evt: dia.Event, x: number, y: number): void;

        protected dragLabel(evt: dia.Event, x: number, y: number): void;

        protected dragArrowhead(evt: dia.Event, x: number, y: number): void;

        protected drag(evt: dia.Event, x: number, y: number): void;

        protected dragLabelEnd(evt: dia.Event, x: number, y: number): void;

        protected dragArrowheadEnd(evt: dia.Event, x: number, y: number): void;

        protected dragEnd(evt: dia.Event, x: number, y: number): void;

        protected findPath(route: Point[], sourcePoint: Point, targetPoint: Point): g.Path;

        protected notifyPointerdown(evt: dia.Event, x: number, y: number): void;

        protected notifyPointermove(evt: dia.Event, x: number, y: number): void;

        protected notifyPointerup(evt: dia.Event, x: number, y: number): void;

        protected mountLabels(): void;

        protected unmountLabels(): void;
    }

    // dia.Paper

    export namespace Paper {

        export interface GradientOptions {
            id?: string;
            type: 'linearGradient' | 'radialGradient';
            stops: Array<{
                offset: string;
                color: string;
                opacity?: number;
            }>;
        }
        export interface FilterOptions {
            [key: string]: any;
        }

        export interface PatternOptions {
            [key: string]: any;
        }

        export interface MarkerOptions {
            [key: string]: any;
        }

        export interface GridOptions {
            color?: string;
            thickness?: number;
            name?: 'dot' | 'fixedDot' | 'mesh' | 'doubleMesh';
            args?: Array<{ [key: string]: any }> | { [key: string]: any };
        }

        export interface BackgroundOptions {
            color?: string;
            image?: string;
            quality?: number;
            position?: Point | string;
            size?: Size | string;
            repeat?: string;
            opacity?: number;
            waterMarkAngle?: number;
        }

        export type Dimension = number | string | null;

        export enum sorting {
            EXACT = 'sorting-exact',
            APPROX = 'sorting-approximate',
            NONE = 'sorting-none'
        }

        export enum Layers {
            CELLS = 'cells',
            LABELS = 'labels',
            BACK = 'back',
            FRONT = 'front',
            TOOLS = 'tools',
            GRID = 'grid',
        }

        export type UpdateStats = {
            priority: number;
            updated: number;
            empty?: boolean;
            postponed?: number;
            unmounted?: number;
            mounted?: number;
            batches?: number;
        };

        export type ViewportCallback = (view: mvc.View<any, any>, isMounted: boolean, paper: Paper) => boolean;
        export type ProgressCallback = (done: boolean, processed: number, total: number, stats: UpdateStats, paper: Paper) => void;
        export type BeforeRenderCallback = (opt: { [key: string]: any }, paper: Paper) => void;
        export type AfterRenderCallback = (stats: UpdateStats, opt: { [key: string]: any }, paper: Paper) => void;

        export interface FreezeOptions {
            key?: string;
        }

        export interface UnfreezeOptions {
            key?: string;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            batchSize?: number;
            viewport?: ViewportCallback;
            progress?: ProgressCallback;
            beforeRender?: BeforeRenderCallback;
            afterRender?: AfterRenderCallback;
        }

        export type PointConstraintCallback = (x: number, y: number, opt: any) => Point;
        export type RestrictTranslateCallback = (elementView: ElementView, x0: number, y0: number) => BBox | boolean | PointConstraintCallback;
        export type FindParentByType = 'bbox' | 'pointer' | PositionName;
        export type FindParentByCallback = ((this: dia.Graph, elementView: ElementView, evt: dia.Event, x: number, y: number) => Cell[]);

        export interface Options extends mvc.ViewOptions<Graph> {
            // appearance
            width?: Dimension;
            height?: Dimension;
            drawGrid?: boolean | GridOptions | GridOptions[];
            drawGridSize?: number | null;
            background?: BackgroundOptions;
            labelsLayer?: boolean | Paper.Layers | string;
            // interactions
            gridSize?: number;
            highlighting?: boolean | Record<string | dia.CellView.Highlighting, highlighters.HighlighterJSON | boolean>;
            interactive?: ((cellView: CellView, event: string) => boolean | CellView.InteractivityOptions) | boolean | CellView.InteractivityOptions;
            snapLabels?: boolean;
            snapLinks?: boolean | { radius: number };
            snapLinksSelf?: boolean | { distance: number };
            markAvailable?: boolean;
            // validations
            validateMagnet?: (cellView: CellView, magnet: SVGElement, evt: dia.Event) => boolean;
            validateConnection?: (cellViewS: CellView, magnetS: SVGElement, cellViewT: CellView, magnetT: SVGElement, end: LinkEnd, linkView: LinkView) => boolean;
            restrictTranslate?: RestrictTranslateCallback | boolean | BBox;
            multiLinks?: boolean;
            linkPinning?: boolean;
            allowLink?: ((linkView: LinkView, paper: Paper) => boolean) | null;
            // events
            guard?: (evt: dia.Event, view: CellView) => boolean;
            preventContextMenu?: boolean;
            preventDefaultViewAction?: boolean;
            preventDefaultBlankAction?: boolean;
            clickThreshold?: number;
            moveThreshold?: number;
            magnetThreshold?: number | string;
            // views
            elementView?: typeof ElementView | ((element: Element) => typeof ElementView);
            linkView?: typeof LinkView | ((link: Link) => typeof LinkView);
            // embedding
            embeddingMode?: boolean;
            frontParentOnly?: boolean;
            findParentBy?: FindParentByType | FindParentByCallback;
            validateEmbedding?: (this: Paper, childView: ElementView, parentView: ElementView) => boolean;
            validateUnembedding?: (this: Paper, childView: ElementView) => boolean;
            // default views, models & attributes
            cellViewNamespace?: any;
            routerNamespace?: any;
            connectorNamespace?: any;
            highlighterNamespace?: any;
            anchorNamespace?: any;
            linkAnchorNamespace?: any;
            connectionPointNamespace?: any;
            defaultLink?: ((cellView: CellView, magnet: SVGElement) => Link) | Link;
            defaultRouter?: routers.Router | routers.RouterJSON;
            defaultConnector?: connectors.Connector | connectors.ConnectorJSON;
            defaultAnchor?: anchors.AnchorJSON | anchors.Anchor;
            defaultLinkAnchor?: anchors.AnchorJSON | anchors.Anchor;
            defaultConnectionPoint?: connectionPoints.ConnectionPointJSON | connectionPoints.ConnectionPoint | ((...args: any[]) => connectionPoints.ConnectionPoint);
            // connecting
            connectionStrategy?: connectionStrategies.ConnectionStrategy;
            // rendering
            async?: boolean;
            sorting?: sorting;
            frozen?: boolean;
            autoFreeze?: boolean;
            viewport?: ViewportCallback | null;
            onViewUpdate?: (view: mvc.View<any, any>, flag: number, priority: number, opt: { [key: string]: any }, paper: Paper) => void;
            onViewPostponed?: (view: mvc.View<any, any>, flag: number, paper: Paper) => boolean;
            beforeRender?: Paper.BeforeRenderCallback;
            afterRender?: Paper.AfterRenderCallback;
            overflow?: boolean;
        }

        export interface TransformToFitContentOptions {
            padding?: Padding;
            preserveAspectRatio?: boolean;
            minScale?: number;
            minScaleX?: number;
            minScaleY?: number;
            maxScale?: number;
            maxScaleX?: number;
            maxScaleY?: number;
            scaleGrid?: number;
            useModelGeometry?: boolean;
            fittingBBox?: BBox;
            contentArea?: BBox;
            verticalAlign?: 'top' | 'middle' | 'bottom';
            horizontalAlign?: 'left' | 'middle' | 'right';
        }

        /**
         * @deprecated
         */
        export type ScaleContentOptions = TransformToFitContentOptions;

        export interface FitToContentOptions {
            gridWidth?: number;
            gridHeight?: number;
            padding?: Padding;
            allowNewOrigin?: 'negative' | 'positive' | 'any';
            allowNegativeBottomRight?: boolean;
            minWidth?: number;
            minHeight?: number;
            maxWidth?: number;
            maxHeight?: number;
            useModelGeometry?: boolean;
            contentArea?: BBox;
        }

        export interface EventMap {
            // pointerclick
            'cell:pointerclick': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:pointerclick': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:pointerclick': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:pointerclick': (evt: dia.Event, x: number, y: number) => void;
            // pointerdblclick
            'cell:pointerdblclick': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:pointerdblclick': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:pointerdblclick': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:pointerdblclick': (evt: dia.Event, x: number, y: number) => void;
            // contextmenu
            'cell:contextmenu': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:contextmenu': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:contextmenu': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:contextmenu': (evt: dia.Event, x: number, y: number) => void;
            // pointerdown
            'cell:pointerdown': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:pointerdown': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:pointerdown': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:pointerdown': (evt: dia.Event, x: number, y: number) => void;
            // pointerdown
            'cell:pointermove': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:pointermove': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:pointermove': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:pointermove': (evt: dia.Event, x: number, y: number) => void;
            // pointerup
            'cell:pointerup': (cellView: dia.CellView, evt: dia.Event, x: number, y: number) => void;
            'element:pointerup': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number) => void;
            'link:pointerup': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number) => void;
            'blank:pointerup': (evt: dia.Event, x: number, y: number) => void;
            // mouseover
            'cell:mouseover': (cellView: dia.CellView, evt: dia.Event) => void;
            'element:mouseover': (elementView: dia.ElementView, evt: dia.Event) => void;
            'link:mouseover': (linkView: dia.LinkView, evt: dia.Event) => void;
            'blank:mouseover': (evt: dia.Event) => void;
            // mouseout
            'cell:mouseout': (cellView: dia.CellView, evt: dia.Event) => void;
            'element:mouseout': (elementView: dia.ElementView, evt: dia.Event) => void;
            'link:mouseout': (linkView: dia.LinkView, evt: dia.Event) => void;
            'blank:mouseout': (evt: dia.Event) => void;
            // mouseenter
            'cell:mouseenter': (cellView: dia.CellView, evt: dia.Event) => void;
            'element:mouseenter': (elementView: dia.ElementView, evt: dia.Event) => void;
            'link:mouseenter': (linkView: dia.LinkView, evt: dia.Event) => void;
            'blank:mouseenter': (evt: dia.Event) => void;
            // mouseleave
            'cell:mouseleave': (cellView: dia.CellView, evt: dia.Event) => void;
            'element:mouseleave': (elementView: dia.ElementView, evt: dia.Event) => void;
            'link:mouseleave': (linkView: dia.LinkView, evt: dia.Event) => void;
            'blank:mouseleave': (evt: dia.Event) => void;
            // mousewheel
            'cell:mousewheel': (cellView: dia.CellView, evt: dia.Event, x: number, y: number, delta: number) => void;
            'element:mousewheel': (elementView: dia.ElementView, evt: dia.Event, x: number, y: number, delta: number) => void;
            'link:mousewheel': (linkView: dia.LinkView, evt: dia.Event, x: number, y: number, delta: number) => void;
            'blank:mousewheel': (evt: dia.Event, x: number, y: number, delta: number) => void;
            // touchpad
            'paper:pan': (evt: dia.Event, deltaX: number, deltaY: number) => void;
            'paper:pinch': (evt: dia.Event, x: number, y: number, scale: number) => void;
            // magnet
            'element:magnet:pointerclick': (elementView: dia.ElementView, evt: dia.Event, magnetNode: SVGElement, x: number, y: number) => void;
            'element:magnet:pointerdblclick': (elementView: dia.ElementView, evt: dia.Event, magnetNode: SVGElement, x: number, y: number) => void;
            'element:magnet:contextmenu': (elementView: dia.ElementView, evt: dia.Event, magnetNode: SVGElement, x: number, y: number) => void;
            // highlighting
            'cell:highlight': (cellView: dia.CellView, node: SVGElement, options: dia.CellView.EventHighlightOptions) => void;
            'cell:unhighlight': (cellView: dia.CellView, node: SVGElement, options: dia.CellView.EventHighlightOptions) => void;
            'cell:highlight:invalid': (cellView: dia.CellView, highlighterId: string, highlighter: dia.HighlighterView) => void;
            // connect
            'link:connect': (linkView: dia.LinkView, evt: dia.Event, newCellView: dia.CellView, newCellViewMagnet: SVGElement, arrowhead: dia.LinkEnd) => void;
            'link:disconnect': (linkView: dia.LinkView, evt: dia.Event, prevCellView: dia.CellView, prevCellViewMagnet: SVGElement, arrowhead: dia.LinkEnd) => void;
            'link:snap:connect': (linkView: dia.LinkView, evt: dia.Event, newCellView: dia.CellView, newCellViewMagnet: SVGElement, arrowhead: dia.LinkEnd) => void;
            'link:snap:disconnect': (linkView: dia.LinkView, evt: dia.Event, prevCellView: dia.CellView, prevCellViewMagnet: SVGElement, arrowhead: dia.LinkEnd) => void;
            // render
            'render:done': (stats: UpdateStats, opt: any) => void;
            // transformations
            'translate': (tx: number, ty: number, data: unknown) => void;
            'scale': (sx: number, sy: number, data: unknown) => void;
            'resize': (width: number, height: number, data: unknown) => void;
            'transform': (matrix: SVGMatrix, data: unknown) => void;
            // custom
            [eventName: string]: mvc.EventHandler;
        }
    }

    export class Paper extends mvc.View<Graph> {

        constructor(opt: Paper.Options);

        options: Paper.Options;

        stylesheet: string;

        svg: SVGSVGElement;
        defs: SVGDefsElement;
        cells: SVGGElement;
        tools: SVGGElement;
        layers: SVGGElement;
        viewport: SVGGElement;

        GUARDED_TAG_NAMES: string[];
        FORM_CONTROLS_TAG_NAMES: string[];

        matrix(): SVGMatrix;
        matrix(ctm: SVGMatrix | Vectorizer.Matrix, data?: any): this;

        clientMatrix(): SVGMatrix;

        clientOffset(): g.Point;

        pageOffset(): g.Point;

        clientToLocalPoint(x: number, y: number): g.Point;
        clientToLocalPoint(point: Point): g.Point;

        clientToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        clientToLocalRect(rect: BBox): g.Rect;

        localToClientPoint(x: number, y: number): g.Point;
        localToClientPoint(point: Point): g.Point;

        localToClientRect(x: number, y: number, width: number, height: number): g.Rect;
        localToClientRect(rect: BBox): g.Rect;

        localToPagePoint(x: number, y: number): g.Point;
        localToPagePoint(point: Point): g.Point;

        localToPageRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPageRect(rect: BBox): g.Rect;

        localToPaperPoint(x: number, y: number): g.Point;
        localToPaperPoint(point: Point): g.Point;

        localToPaperRect(x: number, y: number, width: number, height: number): g.Rect;
        localToPaperRect(rect: BBox): g.Rect;

        pageToLocalPoint(x: number, y: number): g.Point;
        pageToLocalPoint(point: Point): g.Point;

        pageToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        pageToLocalRect(rect: BBox): g.Rect;

        paperToLocalPoint(x: number, y: number): g.Point;
        paperToLocalPoint(point: Point): g.Point;

        paperToLocalRect(x: number, y: number, width: number, height: number): g.Rect;
        paperToLocalRect(x: BBox): g.Rect;

        snapToGrid(x: number, y: number): g.Point;
        snapToGrid(point: Point): g.Point;

        defineFilter(filter: SVGFilterJSON): string;

        defineGradient(gradient: SVGGradientJSON): string;

        defineMarker(marker: SVGMarkerJSON): string;

        definePattern(pattern: Omit<SVGPatternJSON, 'type'>): string;

        isDefined(defId: string): boolean;

        getComputedSize(): Size;

        getArea(): g.Rect;

        getRestrictedArea(): g.Rect | null;
        getRestrictedArea(elementView: ElementView, x: number, y: number): g.Rect | null | Paper.PointConstraintCallback;

        getContentArea(opt?: { useModelGeometry: boolean }): g.Rect;

        getContentBBox(opt?: { useModelGeometry: boolean }): g.Rect;

        findView<T extends ElementView | LinkView>(element: mvc.$SVGElement): T;

        findViewByModel<T extends ElementView | LinkView>(model: Cell | Cell.ID): T;

        findViewsFromPoint(point: string | Point): ElementView[];

        findViewsInArea(rect: BBox, opt?: { strict?: boolean }): ElementView[];

        fitToContent(opt?: Paper.FitToContentOptions): g.Rect;
        fitToContent(gridWidth?: number, gridHeight?: number, padding?: number, opt?: any): g.Rect;

        getFitToContentArea(opt?: Paper.FitToContentOptions): g.Rect;

        /**
         * @deprecated use transformToFitContent
         */
        scaleContentToFit(opt?: Paper.ScaleContentOptions): void;

        transformToFitContent(opt?: Paper.TransformToFitContentOptions): void;

        drawBackground(opt?: Paper.BackgroundOptions): this;

        getDefaultLink(cellView: CellView, magnet: SVGElement): Link;

        getModelById(id: Cell.ID | Cell): Cell;

        setDimensions(width: Paper.Dimension, height: Paper.Dimension, data?: any): void;

        setInteractivity(value: any): void;

        scale(): Vectorizer.Scale;
        scale(sx: number, sy?: number, data?: any): this;

        scaleUniformAtPoint(scale: number, point: Point, data?: any): this;

        translate(): Vectorizer.Translation;
        translate(tx: number, ty?: number, data?: any): this;

        update(): this;

        getPointerArgs(evt: dia.Event): [dia.Event, number, number];

        // grid

        setGrid(opt?: null | boolean | string | Paper.GridOptions | Paper.GridOptions[]): this;

        setGridSize(gridSize: number): this;

        // tools

        removeTools(): this;

        hideTools(): this;

        showTools(): this;

        dispatchToolsEvent(eventName: string, ...args: any[]): void;

        // layers

        getLayerNode(layerName: Paper.Layers | string): SVGGElement;

        getLayerView(layerName: Paper.Layers | string): any;

        hasLayerView(layerName: Paper.Layers | string): boolean;

        renderLayers(layers: Array<{ name: string }>): void;

        protected removeLayers(): void;

        protected resetLayers(): void;

        // rendering

        freeze(opt?: Paper.FreezeOptions): void;

        unfreeze(opt?: Paper.UnfreezeOptions): void;

        isFrozen(): boolean;

        requestViewUpdate(view: mvc.View<any, any>, flag: number, priority: number, opt?: { [key: string]: any }): void;

        requireView<T extends ElementView | LinkView>(model: Cell | Cell.ID, opt?: dia.Cell.Options): T;

        dumpViews(opt?: {
            batchSize?: number;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
        }): void;

        checkViewport(opt?: {
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
        }): {
            mounted: number;
            unmounted: number;
        };

        updateViews(opt?: {
            batchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
        }): {
            updated: number;
            batches: number;
        };

        hasScheduledUpdates(): boolean;

        // events

        on<T extends keyof Paper.EventMap = keyof Paper.EventMap>(eventName: T, callback: Paper.EventMap[T], context?: any): this;

        on<T extends keyof Paper.EventMap = keyof Paper.EventMap>(events: { [eventName in T]: Paper.EventMap[eventName]; }, context?: any): this;

        // protected

        /**
         * For the specified view, calls the visibility viewport function specified by the paper.options.viewport function.
         * If the function returns true, the view is attached to the DOM; in other case it is detached.
         * While async papers do this automatically, synchronous papers require an explicit call to this method for this functionality to be applied. To show the view again, use paper.requestView().
         * If you are using autoFreeze option you should call this function if you are calling paper.requestView() if you want paper.options.viewport function to be applied.
         * @param cellView cellView for which the visibility check is performed
         * @param opt if opt.viewport is provided, it is used as the callback function instead of paper.options.viewport.
         */
        protected checkViewVisibility(cellView: dia.CellView, opt?: {
            viewport?: Paper.ViewportCallback;
        }): {
            mounted: number;
            unmounted: number;
        };

        protected scheduleViewUpdate(view: mvc.View<any, any>, flag: number, priority: number, opt?: { [key: string]: any }): void;

        protected dumpViewUpdate(view: mvc.View<any, any>): number;

        protected dumpView(view: mvc.View<any, any>, opt?: { [key: string]: any }): number;

        protected updateView(view: mvc.View<any, any>, flag: number, opt?: { [key: string]: any }): number;

        protected registerUnmountedView(view: mvc.View<any, any>): number;

        protected registerMountedView(view: mvc.View<any, any>): number;

        protected updateViewsAsync(opt?: {
            batchSize?: number;
            mountBatchSize?: number;
            unmountBatchSize?: number;
            viewport?: Paper.ViewportCallback;
            progress?: Paper.ProgressCallback;
            before?: Paper.BeforeRenderCallback;
        }): void;

        protected updateViewsBatch(opt?: {
            batchSize?: number;
            viewport?: Paper.ViewportCallback;
        }): Paper.UpdateStats;

        protected checkMountedViews(viewport: Paper.ViewportCallback, opt?: { unmountBatchSize?: number }): number;

        protected checkUnmountedViews(viewport: Paper.ViewportCallback, opt?: { mountBatchSize?: number }): number;

        protected isAsync(): boolean;

        protected isExactSorting(): boolean;

        protected sortViews(): void;

        protected sortViewsExact(): void;

        protected pointerdblclick(evt: dia.Event): void;

        protected pointerclick(evt: dia.Event): void;

        protected contextmenu(evt: dia.Event): void;

        protected pointerdown(evt: dia.Event): void;

        protected pointermove(evt: dia.Event): void;

        protected pointerup(evt: dia.Event): void;

        protected mouseover(evt: dia.Event): void;

        protected mouseout(evt: dia.Event): void;

        protected mouseenter(evt: dia.Event): void;

        protected mouseleave(evt: dia.Event): void;

        protected mousewheel(evt: dia.Event): void;

        protected onevent(evt: dia.Event): void;

        protected onmagnet(evt: dia.Event): void;

        protected onlabel(evt: dia.Event): void;

        protected guard(evt: dia.Event, view: CellView): boolean;

        protected drawBackgroundImage(img: HTMLImageElement, opt: { [key: string]: any }): void;

        protected updateBackgroundColor(color: string): void;

        protected updateBackgroundImage(opt: { position?: any, size?: any }): void;

        protected createViewForModel(cell: Cell): CellView;

        protected cloneOptions(): Paper.Options;

        protected onCellAdded(cell: Cell, collection: mvc.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onCellRemoved(cell: Cell, collection: mvc.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onCellChanged(cell: Cell, opt: dia.Cell.Options): void;
        protected onCellChanged(cell: mvc.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onGraphReset(cells: mvc.Collection<Cell>, opt: dia.Graph.Options): void;

        protected onGraphSort(): void;

        protected onGraphBatchStop(): void;

        protected onCellHighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onCellUnhighlight(cellView: CellView, magnetEl: SVGElement, opt?: { highlighter?: highlighters.HighlighterJSON }): void;

        protected onRemove(): void;

        protected removeView(cell: Cell): CellView;

        protected removeViews(): void;

        protected renderView(cell: Cell): CellView;

        protected resetViews(cells?: Cell[], opt?: { [key: string]: any }): void;

        protected insertView(cellView: CellView, isInitialInsert: boolean): void;

        protected detachView(cellView: CellView): void;

        protected customEventTrigger(event: dia.Event, view: CellView, rootNode?: SVGElement): dia.Event | null;

        protected addStylesheet(stylesheet: string): void;
    }

    export namespace PaperLayer {

        export interface Options extends mvc.ViewOptions<undefined, SVGElement> {
            name: string;
        }
    }
    export class PaperLayer extends mvc.View<undefined, SVGElement> {

        constructor(opt?: PaperLayer.Options);

        options: PaperLayer.Options;

        pivotNodes: { [z: number]: Comment };

        insertSortedNode(node: SVGElement, z: number): void;

        insertNode(node: SVGElement): void;

        insertPivot(z: number): Comment;

        removePivots(): void;
    }

    export namespace ToolsView {

        export interface Options extends mvc.ViewOptions<undefined, SVGElement> {
            tools?: dia.ToolView[];
            name?: string | null;
            relatedView?: dia.CellView;
            component?: boolean;
            layer?: dia.Paper.Layers | string | null;
            z?: number;
        }
    }

    export class ToolsView extends mvc.View<undefined, SVGElement> {

        constructor(opt?: ToolsView.Options);

        isRendered: boolean;

        options: ToolsView.Options;

        configure(opt?: ToolsView.Options): this;

        getName(): string | null;

        focusTool(tool: ToolView): this;

        blurTool(tool?: ToolView): this;

        show(): this;

        hide(): this;

        mount(): this;

        protected simulateRelatedView(el: SVGElement): void;
    }

    export namespace ToolView {
        export interface Options extends mvc.ViewOptions<undefined, SVGElement> {
            focusOpacity?: number;
        }
    }

    export class ToolView extends mvc.View<undefined, SVGElement> {

        name: string | null;
        parentView: ToolsView;
        relatedView: dia.CellView;
        paper: Paper;

        constructor(opt?: ToolView.Options);

        configure(opt?: ToolView.Options): this;

        show(): void;

        hide(): void;

        isVisible(): boolean;

        focus(): void;

        blur(): void;

        update(): void;

        protected guard(evt: dia.Event): boolean;
    }


    export namespace HighlighterView {

        export type Constructor<T> = { new(): T };

        export type NodeSelectorJSON = {
            selector?: string;
            port?: string;
            label?: number;
        };

        export type NodeSelector = string | SVGElement | NodeSelectorJSON;

        export interface Options extends mvc.ViewOptions<undefined, SVGElement> {
            layer?: dia.Paper.Layers | string | null;
            z?: number;
        }
    }

    export class HighlighterView<Options extends mvc.ViewOptions<undefined, SVGElement> = HighlighterView.Options> extends mvc.View<undefined, SVGElement> {

        constructor(options?: Options);

        options: Options;

        UPDATABLE: boolean;
        MOUNTABLE: boolean;
        UPDATE_ATTRIBUTES: string[] | ((this: HighlighterView<Options>) => string[]);

        cellView: dia.CellView;
        nodeSelector: HighlighterView.NodeSelector | null;
        node: SVGElement | null;
        updateRequested: boolean;
        postponedUpdate: boolean;
        transformGroup: Vectorizer | null;
        detachedTransformGroup: Vectorizer | null;

        protected findNode(cellView: dia.CellView, nodeSelector: HighlighterView.NodeSelector): SVGElement | null;

        protected transform(): void;

        protected update(): void;

        protected highlight(cellView: dia.CellView, node: SVGElement): void;

        protected unhighlight(cellView: dia.CellView, node: SVGElement): void;

        protected listenToUpdateAttributes(cellView: dia.CellView): void;

        protected onCellAttributeChange(): void;

        protected getNodeMatrix(cellView: dia.CellView, node: SVGElement): SVGMatrix;

        static uniqueId(node: SVGElement, options?: any): string;

        static add<T extends HighlighterView>(
        this: HighlighterView.Constructor<T>,
        cellView: dia.CellView,
        selector: HighlighterView.NodeSelector,
        id: string,
        options?: any
        ): T;

        static remove(
        cellView: dia.CellView,
        id?: string
        ): void;

        static removeAll(
        paper: dia.Paper,
        id?: string
        ): void;

        static get<T extends HighlighterView>(
        this: HighlighterView.Constructor<T>,
        cellView: dia.CellView,
        id: string
        ): T | null;
        static get<T extends HighlighterView>(
        this: HighlighterView.Constructor<T>,
        cellView: dia.CellView
        ): T[];

        static update(cellView: dia.CellView, id?: string): void;

        static transform(cellView: dia.CellView, id?: string): void;

        static highlight(cellView: dia.CellView, node: SVGElement, options?: any): void;

        static unhighlight(cellView: dia.CellView, node: SVGElement, options?: any): void;

        protected static _addRef(cellView: dia.CellView, id: string, view: HighlighterView): void;

        protected static _removeRef(cellView: dia.CellView, id?: string): void;
    }
}

export declare namespace elementTools {

    export namespace Button {

        export type ActionCallback = (evt: dia.Event, view: dia.ElementView, tool: dia.ToolView) => void;

        export interface Options extends dia.ToolView.Options {
            x?: number | string;
            y?: number | string;
            offset?: { x?: number, y?: number };
            rotate?: boolean;
            action?: ActionCallback;
            markup?: dia.MarkupJSON;
            useModelGeometry?: boolean;
            scale?: number;
        }
    }

    export class Button extends dia.ToolView {

        constructor(opt?: Button.Options);

        protected onPointerDown(evt: dia.Event): void;
    }

    export class Remove extends Button {

    }

    export namespace Connect {

        export type MagnetCallback = ((this: Connect, view: dia.ElementView, tool: Connect) => SVGElement);

        export interface Options extends Button.Options {
            magnet?: string | SVGElement | MagnetCallback;
        }
    }

    export class Connect extends Button {

        constructor(opt?: Connect.Options);

        protected getMagnetNode(): SVGElement;

        protected dragstart(evt: dia.Event): void;

        protected drag(evt: dia.Event): void;

        protected dragend(evt: dia.Event): void;
    }

    export namespace Boundary {
        export interface Options extends dia.ToolView.Options {
            padding?: number | dia.Sides;
            useModelGeometry?: boolean;
            rotate?: boolean;
        }
    }

    export class Boundary extends dia.ToolView {

        constructor(opt?: Boundary.Options);
    }

    export namespace Control {
        export interface Options extends dia.ToolView.Options {
            selector?: string | null;
            padding?: number;
            handleAttributes?: Partial<attributes.NativeSVGAttributes>;
            scale?: number;
        }
    }

    export abstract class Control<T extends mvc.ViewOptions<undefined, SVGElement> = Control.Options> extends dia.ToolView {
        options: T;
        constructor(opt?: T);

        protected getPosition(view: dia.ElementView): dia.Point;
        protected setPosition(view: dia.ElementView, coordinates: g.Point): void;
        protected resetPosition(view: dia.ElementView): void;

        protected updateHandle(handleNode: SVGElement): void;
        protected updateExtras(extrasNode: SVGElement): void;
        protected toggleExtras(visible: boolean): void;

        protected onPointerDown(evt: dia.Event): void;
        protected onPointerMove(evt: dia.Event): void;
        protected onPointerUp(evt: dia.Event): void;
        protected onPointerDblClick(evt: dia.Event): void;
    }

    export namespace HoverConnect {

        export type TrackPath = string;

        export type TrackPathCallback = (this: HoverConnect, view: dia.ElementView) => TrackPath;

        export interface Options extends Connect.Options {
            useModelGeometry?: boolean;
            trackWidth?: number;
            trackPath?: TrackPath | TrackPathCallback;
        }
    }

    export class HoverConnect extends linkTools.Connect {

        constructor(opt?: HoverConnect.Options);
    }
}

export declare namespace env {

    export function addTest(name: string, fn: () => boolean): void;

    export function test(name: string): boolean;
}

export declare namespace g {

    export enum types {
        Point = 1,
        Line = 2,
        Ellipse = 3,
        Rect = 4,
        Polyline = 5,
        Polygon = 6,
        Curve = 7,
        Path = 8,
    }

    export type Shape = Path | Point | Line | Polyline | Polygon | Rect | Ellipse;
    export interface PlainPoint {

        x: number;
        y: number;
    }

    export interface PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;
    }

    export interface Scale {

        sx: number;
        sy: number;
    }

    export interface PrecisionOpt {

        precision?: number;
    }

    export interface SubdivisionsOpt extends PrecisionOpt {

        subdivisions?: Curve[];
    }

    export interface SegmentSubdivisionsOpt extends PrecisionOpt {

        segmentSubdivisions?: Curve[][];
    }

    export interface PathT {

        segmentIndex: number;
        value: number;
    }

    export interface Segment {

        type: SegmentType;

        isSegment: boolean;
        isSubpathStart: boolean;
        isVisible: boolean;

        nextSegment: Segment | null;
        previousSegment: Segment | null;
        subpathStartSegment: Segment | null;

        start: Point | null | never; // getter, `never` for Moveto
        end: Point | null; // getter or directly assigned

        bbox(): Rect | null;

        clone(): Segment;

        closestPoint(p: Point, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SubdivisionsOpt): number;

        closestPointT(p: Point): number;

        closestPointTangent(p: Point): Line | null;

        divideAt(ratio: number, opt?: SubdivisionsOpt): [Segment, Segment];

        divideAtLength(length: number, opt?: SubdivisionsOpt): [Segment, Segment];

        divideAtT(t: number): [Segment, Segment];

        equals(segment: Segment): boolean;

        getSubdivisions(): Curve[];

        isDifferentiable(): boolean;

        length(): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number): Point;

        pointAtLength(length: number): Point;

        pointAtT(t: number): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        tangentAtT(t: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;
    }

    export interface SegmentTypes {

        [key: string]: Segment;
    }

    export type CardinalDirection = 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'N';

    export type RectangleSide = 'left' | 'right' | 'top' | 'bottom';

    export type PathSegmentUnit = Segment | Segment[];

    export type PathObjectUnit = Line | Line[] | Curve | Curve[];

    export type SegmentType = 'L' | 'C' | 'M' | 'Z' | 'z';

    export function normalizeAngle(angle: number): number;

    export function snapToGrid(val: number, gridSize: number): number;

    export function toDeg(rad: number): number;

    export function toRad(deg: number, over360?: boolean): number;

    export function random(min?: number, max?: number): number;

    export interface SkeletonPoints {
        startControlPoint1: Point;
        startControlPoint2: Point;
        divider: Point;
        dividerControlPoint1: Point;
        dividerControlPoint2: Point;
    }

    export class Curve {

        start: Point;
        controlPoint1: Point;
        controlPoint2: Point;
        end: Point;
        type: types.Curve;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string, p3: PlainPoint | string, p4: PlainPoint | string);
        constructor(curve: Curve);

        bbox(): Rect;

        clone(): Curve;

        closestPoint(p: PlainPoint, opt?: SubdivisionsOpt): Point;

        closestPointLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointNormalizedLength(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointT(p: PlainPoint, opt?: SubdivisionsOpt): number;

        closestPointTangent(p: PlainPoint, opt?: SubdivisionsOpt): Line | null;

        containsPoint(p: PlainPoint, opt?: SubdivisionsOpt): boolean;

        divideAt(ratio: number, opt?: SubdivisionsOpt): [Curve, Curve];

        divideAtLength(length: number, opt?: SubdivisionsOpt): [Curve, Curve];

        divideAtT(t: number): [Curve, Curve];
        divide(t: number): [Curve, Curve]; // alias to `divideAtT`

        endpointDistance(): number;

        equals(c: Curve): boolean;

        getSkeletonPoints(t: number): SkeletonPoints;

        getSubdivisions(opt?: PrecisionOpt): Curve[];

        isDifferentiable(): boolean;

        length(opt?: SubdivisionsOpt): number;

        lengthAtT(t: number, opt?: PrecisionOpt): number;

        pointAt(ratio: number, opt?: SubdivisionsOpt): Point;

        pointAtLength(length: number, opt?: SubdivisionsOpt): Point;

        pointAtT(t: number): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        tangentAt(ratio: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SubdivisionsOpt): Line | null;

        tangentAtT(t: number): Line | null;

        tAt(ratio: number, opt?: SubdivisionsOpt): number;

        tAtLength(length: number, opt?: SubdivisionsOpt): number;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toPoints(opt?: SubdivisionsOpt): Point[];

        toPolyline(opt?: SubdivisionsOpt): Polyline;

        toString(): string;

        static throughPoints(points: PlainPoint[]): Curve[];
    }

    export class Ellipse {

        x: number;
        y: number;
        a: number;
        b: number;
        type: types.Ellipse;

        constructor(center: PlainPoint | string, a: number, b: number);
        constructor(ellipse: Ellipse);

        bbox(): Rect;

        center(): Point;

        clone(): Ellipse;

        containsPoint(p: PlainPoint): boolean;

        equals(ellipse: Ellipse): boolean;

        inflate(dx?: number, dy?: number): this;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint, angle?: number): Point;

        normalizedDistance(point: PlainPoint): number;

        round(precision?: number): this;

        tangentTheta(p: PlainPoint): number;

        toString(): string;

        static fromRect(rect: PlainRect): Ellipse;
    }

    export class Line {

        start: Point;
        end: Point;
        type: types.Line;

        constructor(p1: PlainPoint | string, p2: PlainPoint | string);
        constructor(line: Line);
        constructor();

        angle(): number;

        bbox(): Rect;

        bearing(): CardinalDirection;

        clone(): Line;

        parallel(distance: number): Line;

        closestPoint(p: PlainPoint | string): Point;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        containsPoint(p: PlainPoint): boolean;

        divideAt(t: number): [Line, Line];

        divideAtLength(length: number): [Line, Line];

        equals(line: Line): boolean;

        intersect(line: Line): Point | null; // Backwards compatibility, should return an array
        intersect(rect: Rect): Point[] | null;
        intersect(ellipse: Ellipse): Point[] | null;
        intersect(polyline: Polyline): Point[] | null;
        intersect(path: Path, opt?: SegmentSubdivisionsOpt): Point[] | null;

        intersectionWithLine(l: Line): Point[] | null;

        isDifferentiable(): boolean;

        length(): number;

        midpoint(): Point;

        pointAt(t: number): Point;

        pointAtLength(length: number): Point;

        pointOffset(p: PlainPoint | string): number;

        rotate(origin: PlainPoint, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint): this;

        setLength(length: number): this;

        squaredLength(): number;

        tangentAt(t: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        vector(): Point;

        toString(): string;

        serialize(): string;
    }

    export class Path {

        segments: Segment[];
        start: Point | null; // getter
        end: Point | null; // getter
        type: types.Path;

        constructor();
        constructor(pathData: string);
        constructor(segments: PathSegmentUnit | PathSegmentUnit[]);
        constructor(objects: PathObjectUnit | PathObjectUnit[]);
        constructor(polyline: Polyline);

        appendSegment(segments: PathSegmentUnit | PathSegmentUnit[]): void;

        bbox(): Rect | null;

        clone(): Path;

        closestPoint(p: Point, opt?: SegmentSubdivisionsOpt): Point | null;

        closestPointLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointNormalizedLength(p: Point, opt?: SegmentSubdivisionsOpt): number;

        closestPointTangent(p: Point, opt?: SegmentSubdivisionsOpt): Line | null;

        containsPoint(p: PlainPoint, opt?: SegmentSubdivisionsOpt): boolean;

        divideAt(ratio: number, opt?: SegmentSubdivisionsOpt): [Path, Path] | null;

        divideAtLength(length: number, opt?: SegmentSubdivisionsOpt): [Path, Path] | null;

        equals(p: Path): boolean;

        getSegment(index: number): Segment | null;

        getSegmentSubdivisions(opt?: PrecisionOpt): Curve[][];

        getSubpaths(): Path[];

        insertSegment(index: number, segments: PathSegmentUnit | PathSegmentUnit[]): void;

        intersectionWithLine(l: Line, opt?: SegmentSubdivisionsOpt): Point[] | null;

        isDifferentiable(): boolean;

        isValid(): boolean;

        length(opt?: SegmentSubdivisionsOpt): number;

        pointAt(ratio: number, opt?: SegmentSubdivisionsOpt): Point | null;

        pointAtLength(length: number, opt?: SegmentSubdivisionsOpt): Point | null;

        removeSegment(index: number): void;

        replaceSegment(index: number, segments: PathSegmentUnit | PathSegmentUnit[]): void;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        segmentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Segment | null;

        segmentIndexAt(ratio: number, opt?: SegmentSubdivisionsOpt): number | null;

        segmentIndexAtLength(length: number, opt?: SegmentSubdivisionsOpt): number | null;

        tangentAt(ratio: number, opt?: SegmentSubdivisionsOpt): Line | null;

        tangentAtLength(length: number, opt?: SegmentSubdivisionsOpt): Line | null;

        toPoints(opt?: SegmentSubdivisionsOpt): Point[][] | null;

        toPolylines(opt?: SegmentSubdivisionsOpt): Polyline[] | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        validate(): this;

        private closestPointT(p: Point, opt?: SegmentSubdivisionsOpt): PathT | null;

        private lengthAtT(t: PathT, opt?: SegmentSubdivisionsOpt): number;

        private pointAtT(t: PathT): Point | null;

        private tangentAtT(t: PathT): Line | null;

        private prepareSegment(segment: Segment, previousSegment?: Segment | null, nextSegment?: Segment | null): Segment;

        private updateSubpathStartSegment(segment: Segment): void;

        static createSegment(type: SegmentType, ...args: any[]): PathSegmentUnit;

        static parse(pathData: string): Path;

        static segmentTypes: SegmentTypes;

        static isDataSupported(pathData: string): boolean;
    }

    export class Point implements PlainPoint {

        x: number;
        y: number;
        type: types.Point;

        constructor(x?: number, y?: number);
        constructor(p: PlainPoint | string);

        chooseClosest(points: PlainPoint[]): Point | null;

        adhereToRect(r: Rect): this;

        angleBetween(p1: PlainPoint, p2: PlainPoint): number;

        bearing(p: Point): CardinalDirection;

        changeInAngle(dx: number, dy: number, ref: PlainPoint | string): number;

        clone(): Point;

        cross(p1: PlainPoint, p2: PlainPoint): number;

        difference(dx?: number, dy?: number): Point;
        difference(p: PlainPoint): Point;

        distance(p: PlainPoint | string): number;

        dot(p: PlainPoint): number;

        equals(p: Point): boolean;

        lerp(p: Point, t: number): Point;

        magnitude(): number;

        manhattanDistance(p: PlainPoint): number;

        move(ref: PlainPoint | string, distance: number): this;

        normalize(length: number): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        reflection(ref: PlainPoint | string): Point;

        rotate(origin: PlainPoint | string, angle: number): this;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        snapToGrid(gx: number, gy?: number): this;

        squaredDistance(p: PlainPoint | string): number;

        theta(p: PlainPoint | string): number;

        toJSON(): PlainPoint;

        toPolar(origin?: PlainPoint | string): this;

        toString(): string;

        serialize(): string;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        update(x?: number, y?: number): this;
        update(p: PlainPoint): this;

        vectorAngle(p: PlainPoint): number;

        static fromPolar(distance: number, angle: number, origin?: PlainPoint | string): Point;

        static random(x1: number, x2: number, y1: number, y2: number): Point;
    }
    export abstract class PolygonalChain {

        points: Point[];
        start: Point | null; // getter
        end: Point | null; // getter

        constructor();
        constructor(svgString: string);
        constructor(points: PlainPoint[]);

        bbox(): Rect | null;

        closestPoint(p: PlainPoint | string): Point | null;

        closestPointLength(p: PlainPoint | string): number;

        closestPointNormalizedLength(p: PlainPoint | string): number;

        closestPointTangent(p: PlainPoint | string): Line | null;

        containsPoint(p: PlainPoint): boolean;

        equals(p: Polyline): boolean;

        isDifferentiable(): boolean;

        intersectionWithLine(l: Line): Point[] | null;

        close(): this;

        length(): number;

        pointAt(ratio: number): Point | null;

        pointAtLength(length: number): Point | null;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        simplify(opt?: { threshold?: number }): this;

        tangentAt(ratio: number): Line | null;

        tangentAtLength(length: number): Line | null;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        serialize(): string;

        toString(): string;

        clone(): this;

        convexHull(): this;
    }

    export class Polyline extends PolygonalChain {

        type: types.Polyline;

        static parse(svgString: string): Polyline;

        static fromRect(rect: Rect): Polyline;
    }

    export class Polygon extends PolygonalChain {

        type: types.Polygon;

        static parse(svgString: string): Polygon;

        static fromRect(rect: Rect): Polygon;
    }

    export class Rect implements PlainRect {

        x: number;
        y: number;
        width: number;
        height: number;
        type: types.Rect;

        constructor(x?: number, y?: number, width?: number, height?: number);
        constructor(r: PlainRect);

        bbox(angle?: number): Rect;

        rotateAroundCenter(angle: number): this;

        bottomLeft(): Point;

        bottomLine(): Line;

        bottomMiddle(): Point;

        bottomRight(): Point;

        center(): Point;

        clone(): Rect;

        containsPoint(p: PlainPoint | string): boolean;

        containsRect(r: PlainRect): boolean;

        corner(): Point;

        equals(r: PlainRect): boolean;

        inflate(dx?: number, dy?: number): this;

        intersect(r: Rect): Rect | null;

        intersectionWithLine(l: Line): Point[] | null;

        intersectionWithLineFromCenterToPoint(p: PlainPoint | string, angle?: number): Point;

        leftLine(): Line;

        leftMiddle(): Point;

        maxRectScaleToFit(rect: PlainRect, origin?: PlainPoint): Scale;

        maxRectUniformScaleToFit(rect: PlainRect, origin?: PlainPoint): number;

        moveAndExpand(r: PlainRect): this;

        normalize(): this;

        offset(dx?: number, dy?: number): this;
        offset(p: PlainPoint): this;

        origin(): Point;

        pointNearestToPoint(point: PlainPoint | string): Point;

        rightLine(): Line;

        rightMiddle(): Point;

        round(precision?: number): this;

        scale(sx: number, sy: number, origin?: PlainPoint | string): this;

        sideNearestToPoint(point: PlainPoint | string): RectangleSide;

        snapToGrid(gx: number, gy?: number): this;

        topLeft(): Point;

        topLine(): Line;

        topMiddle(): Point;

        topRight(): Point;

        translate(tx?: number, ty?: number): this;
        translate(tx: PlainPoint): this;

        toJSON(): PlainRect;

        toString(): string;

        union(rect: PlainRect): Rect;

        update(x?: number, y?: number, width?: number, height?: number): this;
        update(rect: PlainRect): this;

        static fromEllipse(e: Ellipse): Rect;

        static fromPointUnion(...points: PlainPoint[]): Rect | null;

        static fromRectUnion(...rects: PlainRect[]): Rect | null;
    }

    export namespace bezier {

        export interface IBezierCurve {
            p0: Point;
            p1: Point;
            p2: Point;
            p3: Point;
        }

        export function curveThroughPoints(points: PlainPoint[] | Point[]): string[];

        export function getCurveControlPoints(points: PlainPoint[] | Point[]): [Point[], Point[]];

        export function getCurveDivider(
        p0: string | PlainPoint,
        p1: string | PlainPoint,
        p2: string | PlainPoint,
        p3: string | PlainPoint
        ): (t: number) => [IBezierCurve, IBezierCurve];

        export function getFirstControlPoints(rhs: number[]): number[];

        export function getInversionSolver(
        p0: PlainPoint,
        p1: PlainPoint,
        p2: PlainPoint,
        p3: PlainPoint
        ): (p: PlainPoint) => number;
    }

    export namespace scale {

        export function linear(domain: [number, number], range: [number, number], value: number): number;
    }

    export namespace intersection {

        export function exists(shape1: Shape, shape2: Shape, shape1opt?: SegmentSubdivisionsOpt | null, shape2opt?: SegmentSubdivisionsOpt | null): boolean;

        /* Line */

        export function lineWithLine(line1: Line, line2: Line): boolean;

        /* Ellipse */

        export function ellipseWithLine(ellipse: Ellipse, line: Line): boolean;

        export function ellipseWithEllipse(ellipse1: Ellipse, ellipse2: Ellipse): boolean;

        /* Rect */

        export function rectWithLine(rect: Rect, line: Line): boolean;

        export function rectWithEllipse(rect: Rect, ellipse: Ellipse): boolean;

        export function rectWithRect(rect1: Rect, rect2: Rect): boolean;


        /* Polyline */

        export function polylineWithLine(polyline: Polyline, line: Line): boolean;

        export function polylineWithEllipse(polyline: Polyline, ellipse: Ellipse): boolean;

        export function polylineWithRect(polyline: Polyline, rect: Rect): boolean;

        export function polylineWithPolyline(polyline1: Polyline, polyline2: Polyline): boolean;

        /* Polygon */

        export function polygonWithLine(polygon: Polygon, line: Line): boolean;

        export function polygonWithEllipse(polygon: Polygon, ellipse: Ellipse): boolean;

        export function polygonWithRect(polygon: Polygon, rect: Rect): boolean;

        export function polygonWithPolyline(polygon: Polygon, polyline: Polyline): boolean;

        export function polygonWithPolygon(polygon1: Polygon, polygon2: Polygon): boolean;

        /* Path */

        export function pathWithLine(path: Path, line: Line, pathOpt?: SegmentSubdivisionsOpt): boolean;

        export function pathWithEllipse(path: Path, ellipse: Ellipse, pathOpt?: SegmentSubdivisionsOpt): boolean;

        export function pathWithRect(path: Path, rect: Rect, pathOpt?: SegmentSubdivisionsOpt): boolean;

        export function pathWithPolyline(path: Path, polyline: Polyline, pathOpt?: SegmentSubdivisionsOpt): boolean;

        export function pathWithPolygon(path: Path, polygon: Polygon, pathOpt?: SegmentSubdivisionsOpt): boolean;

        export function pathWithPath(path1: Path, path2: Path, pathOpt1?: SegmentSubdivisionsOpt | null, pathOpt2?: SegmentSubdivisionsOpt | null): boolean;
    }
}

export declare namespace highlighters {

    import HighlighterView = dia.HighlighterView;

    export interface AddClassHighlighterArguments extends HighlighterView.Options {
        className?: string;
    }

    export interface OpacityHighlighterArguments extends HighlighterView.Options {
        alphaValue?: number;
    }

    export interface StrokeHighlighterArguments extends HighlighterView.Options {
        padding?: number;
        rx?: number;
        ry?: number;
        useFirstSubpath?: boolean;
        nonScalingStroke?: boolean;
        attrs?: attributes.NativeSVGAttributes;
    }

    export interface MaskHighlighterArguments extends HighlighterView.Options {
        padding?: number;
        maskClip?: number;
        deep?: boolean;
        attrs?: attributes.NativeSVGAttributes;
    }

    export interface HighlighterArgumentsMap {
        'addClass': AddClassHighlighterArguments;
        'opacity': OpacityHighlighterArguments;
        'stroke': StrokeHighlighterArguments;
        'mask': MaskHighlighterArguments;
        [key: string]: { [key: string]: any };
    }

    export type HighlighterType = keyof HighlighterArgumentsMap;

    export type GenericHighlighterArguments<K extends HighlighterType> = HighlighterArgumentsMap[K];

    export interface GenericHighlighterJSON<K extends HighlighterType> {
        name: K;
        options?: GenericHighlighterArguments<K>;
    }

    export type HighlighterJSON = GenericHighlighterJSON<HighlighterType>;

    export class mask extends dia.HighlighterView<MaskHighlighterArguments> {

        VISIBLE: string;
        INVISIBLE: string;
        MASK_ROOT_ATTRIBUTE_BLACKLIST: string[];
        MASK_CHILD_ATTRIBUTE_BLACKLIST: string[];
        MASK_REPLACE_TAGS: string[];
        MASK_REMOVE_TAGS: string[];

        public getMaskId(): string;

        protected getMask(cellView: dia.CellView, vel: Vectorizer): Vectorizer;

        protected getMaskShape(cellView: dia.CellView, vel: Vectorizer): Vectorizer;

        protected transformMaskRoot(cellView: dia.CellView, root: Vectorizer): void;

        protected transformMaskChild(cellView: dia.CellView, child: Vectorizer): boolean;

        protected addMask(paper: dia.Paper, mask: Vectorizer): void;

        protected removeMask(paper: dia.Paper): void;
    }

    export class stroke extends dia.HighlighterView<StrokeHighlighterArguments> {

        protected getPathData(cellView: dia.CellView, node: SVGElement): string;

        protected highlightConnection(cellView: dia.CellView): void;

        protected highlightNode(cellView: dia.CellView, node: SVGElement): void;
    }

    export class addClass extends dia.HighlighterView<AddClassHighlighterArguments> {

    }

    export class opacity extends dia.HighlighterView<OpacityHighlighterArguments> {

        opacityClassName: string;
    }


    export namespace list {

        export enum Directions {
            ROW = 'row',
            COLUMN = 'column'
        }

        export type DirectionsType = 'row' | 'column';

        export enum Positions {
            TOP = 'top',
            RIGHT = 'right',
            BOTTOM = 'bottom',
            LEFT = 'left',
            TOP_LEFT = 'top-left',
            TOP_RIGHT = 'top-right',
            BOTTOM_LEFT = 'bottom-left',
            BOTTOM_RIGHT = 'bottom-right',
            CENTER = 'center',
        }

        export interface Options extends dia.HighlighterView.Options {
            direction?: Directions | DirectionsType;
            position?: Positions | dia.PositionName;
            size?: number | dia.Size;
            gap?: number;
            margin?: number | dia.Sides;
        }
    }

    export class list<Item = any, Options extends mvc.ViewOptions<undefined, SVGElement> = list.Options> extends dia.HighlighterView<Options> {

        options: Options;

        protected createListItem(item: Item, itemSize: dia.Size, itemEl: SVGElement | null): SVGElement;

        protected position(element: dia.Element, listSize: dia.Size): void;
    }

    /**
     * @deprecated
     */
    export interface GenericHighlighter<K extends HighlighterType> {

        highlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;

        unhighlight(cellView: dia.CellView, magnetEl: SVGElement, opt?: GenericHighlighterArguments<K>): void;
    }

    /**
     * @deprecated
     */
    export type HighlighterArguments = GenericHighlighterArguments<HighlighterType>;

    /**
     * @deprecated
     */
    export type Highlighter = GenericHighlighter<HighlighterType>;
}

export declare namespace layout {

    export namespace Port {

        export type Position = {
            x: number | string;
            y: number | string;
        };

        export type Transformation = {
            x: number;
            y: number;
            angle: number;
        };

        export type LayoutFunction = (ports: Array<Object>, elBBox: g.Rect, opt: Options) => Array<Transformation>;

        export interface Options {
            x?: number | string;
            y?: number | string;
            dx?: number;
            dy?: number;
            angle?: number;
            start?: Position;
            end?: Position;
            startAngle?: number;
            step?: number;
            compensateRotation?: boolean;
        }

        var absolute: LayoutFunction;
        var fn: LayoutFunction;
        var line: LayoutFunction;
        var left: LayoutFunction;
        var right: LayoutFunction;
        var top: LayoutFunction;
        var bottom: LayoutFunction;
        var ellipseSpread: LayoutFunction;
        var ellipse: LayoutFunction;
    }

    export namespace PortLabel {

        export interface Options {
            x?: number;
            y?: number;
            angle?: number;
            offset?: number;
            attrs?: dia.Cell.Selectors;
        }

        export interface LabelAttributes {
            x: number;
            y: number;
            angle: number;
            attrs: dia.Cell.Selectors;
        }

        export type LayoutFunction = (portPosition: g.Point, elBBox: g.Rect, opt: Options) => LabelAttributes;

        var manual: LayoutFunction;
        var left: LayoutFunction;
        var right: LayoutFunction;
        var top: LayoutFunction;
        var bottom: LayoutFunction;
        var outsideOriented: LayoutFunction;
        var outside: LayoutFunction;
        var insideOriented: LayoutFunction;
        var inside: LayoutFunction;
        var radial: LayoutFunction;
        var radialOriented: LayoutFunction;
    }
}

export declare namespace linkAnchors {

    export interface ConnectionLengthAnchorArguments {
        length?: number;
    }

    export interface ConnectionRatioAnchorArguments {
        ratio?: number;
    }

    export interface ConnectionPerpendicularAnchorArguments {
        fallbackAt?: number | string;
        fixedAt?: number | string;
    }

    export interface ConnectionClosestAnchorArguments {
        fixedAt?: number | string;
    }

    var connectionRatio: anchors.GenericAnchor<'connectionRatio'>;
    var connectionLength: anchors.GenericAnchor<'connectionLength'>;
    var connectionPerpendicular: anchors.GenericAnchor<'connectionPerpendicular'>;
    var connectionClosest: anchors.GenericAnchor<'connectionClosest'>;
}

export declare namespace linkTools {

    export type AnchorCallback<T> = (
    coords: g.Point,
    view: dia.CellView,
    magnet: SVGElement,
    type: string,
    linkView: dia.LinkView,
    toolView: dia.ToolView
    ) => T;

    export namespace Vertices {

        export class VertexHandle extends mvc.View<undefined, SVGElement> {
            position(x: number, y: number): void;
            protected onPointerDown(evt: dia.Event): void;
            protected onPointerMove(evt: dia.Event): void;
            protected onPointerUp(evt: dia.Event): void;
            protected onPointerClick(evt: dia.Event): void;
        }

        export interface Options extends dia.ToolView.Options {
            handleClass?: typeof VertexHandle;
            snapRadius?: number;
            redundancyRemoval?: boolean;
            vertexAdding?: boolean;
            vertexRemoving?: boolean;
            vertexMoving?: boolean;
            stopPropagation?: boolean;
            scale?: number;
        }
    }

    export class Vertices extends dia.ToolView {

        constructor(opt?: Vertices.Options);
    }

    export namespace Segments {

        export class SegmentHandle extends mvc.View<undefined, SVGElement> {
            position(x: number, y: number, angle: number, view: dia.LinkView): void;
            show(): void;
            hide(): void;
            protected onPointerDown(evt: dia.Event): void;
            protected onPointerMove(evt: dia.Event): void;
            protected onPointerUp(evt: dia.Event): void;
        }

        export interface Options extends dia.ToolView.Options {
            handleClass?: typeof SegmentHandle;
            snapRadius?: number;
            snapHandle?: boolean;
            redundancyRemoval?: boolean;
            segmentLengthThreshold?: number;
            anchor?: AnchorCallback<anchors.AnchorJSON>;
            stopPropagation?: boolean;
            scale?: number;
        }
    }

    export class Segments extends dia.ToolView {

        constructor(opt?: Segments.Options);
    }

    export namespace Arrowhead {

        export interface Options extends dia.ToolView.Options {
            scale?: number;
        }
    }

    export abstract class Arrowhead extends dia.ToolView {

        ratio: number;
        arrowheadType: string;

        constructor(opt?: Arrowhead.Options);

        protected onPointerDown(evt: dia.Event): void;

        protected onPointerMove(evt: dia.Event): void;

        protected onPointerUp(evt: dia.Event): void;
    }

    export class SourceArrowhead extends Arrowhead {


    }

    export class TargetArrowhead extends Arrowhead {


    }

    export namespace Anchor {
        export interface Options extends dia.ToolView.Options {
            snap?: AnchorCallback<dia.Point>;
            anchor?: AnchorCallback<anchors.AnchorJSON>;
            resetAnchor?: boolean | anchors.AnchorJSON;
            customAnchorAttributes?: attributes.NativeSVGAttributes;
            defaultAnchorAttributes?: attributes.NativeSVGAttributes;
            areaPadding?: number;
            snapRadius?: number;
            restrictArea?: boolean;
            redundancyRemoval?: boolean;
            scale?: number;
        }
    }

    export abstract class Anchor extends dia.ToolView {

        type: string;

        constructor(opt?: Anchor.Options);
    }

    export class SourceAnchor extends Anchor {


    }

    export class TargetAnchor extends Anchor {


    }

    export namespace Button {

        export type ActionCallback = (evt: dia.Event, view: dia.LinkView, tool: dia.ToolView) => void;

        export interface Options extends dia.ToolView.Options {
            distance?: number | string;
            offset?: number;
            rotate?: boolean;
            action?: ActionCallback;
            markup?: dia.MarkupJSON;
            scale?: number;
        }
    }

    export class Button extends dia.ToolView {

        constructor(opt?: Button.Options);

        protected onPointerDown(evt: dia.Event): void;
    }

    export class Remove extends Button {

    }

    export namespace Connect {

        export type MagnetCallback = ((this: Connect, view: dia.LinkView, tool: Connect) => SVGElement);

        export interface Options extends Button.Options {
            magnet?: string | SVGElement | MagnetCallback;
        }
    }

    export class Connect extends Button {

        constructor(opt?: Connect.Options);

        protected getMagnetNode(): SVGElement;

        protected dragstart(evt: dia.Event): void;

        protected drag(evt: dia.Event): void;

        protected dragend(evt: dia.Event): void;
    }

    export namespace Boundary {
        export interface Options extends dia.ToolView.Options {
            padding?: number | dia.Sides;
            useModelGeometry?: boolean;
        }
    }

    export class Boundary extends dia.ToolView {

        constructor(opt?: Boundary.Options);
    }

    export namespace HoverConnect {
        export interface Options extends Connect.Options {
        }
    }

    export class HoverConnect extends Connect {

        constructor(opt?: HoverConnect.Options);

        trackPath: g.Path;

        protected getButtonMatrix(): SVGMatrix;

        protected getTrackPath(): g.Path;

        protected getTrackMatrix(): SVGMatrix;

        protected getTrackRatioFromEvent(evt: dia.Event): number;

        protected canShowButton(): boolean;

        protected showButton(): void;

        protected hideButton(): void;

        protected onMousemove(evt: dia.Event): void;

        protected onMouseenter(evt: dia.Event): void;

        protected onMouseleave(evt: dia.Event): void;
    }
}

export declare namespace mvc {

    export type Dom = unknown;
    // The following types represent the DOM elements that can be passed to the
    // $() function.
    export type $Element<T extends Element = Element> = string | T | T[] | Dom;
    export type $HTMLElement = $Element<HTMLElement>;
    export type $SVGElement = $Element<SVGElement>;

    export interface $AnimationOptions {
        duration?: number;
        delay?: number;
        easing?: string;
        complete?: (this: Element) => void;
    }

    export interface Event {
        // Event
        bubbles: boolean | undefined;
        cancelable: boolean | undefined;
        eventPhase: number | undefined;
        // UIEvent
        detail: number | undefined;
        view: Window | undefined;
        // MouseEvent
        button: number | undefined;
        buttons: number | undefined;
        clientX: number | undefined;
        clientY: number | undefined;
        offsetX: number | undefined;
        offsetY: number | undefined;
        pageX: number | undefined;
        pageY: number | undefined;
        screenX: number | undefined;
        screenY: number | undefined;
        /** @deprecated */
        toElement: Element | undefined;
        // PointerEvent
        pointerId: number | undefined;
        pointerType: string | undefined;
        // KeyboardEvent
        /** @deprecated */
        char: string | undefined;
        /** @deprecated */
        charCode: number | undefined;
        key: string | undefined;
        /** @deprecated */
        keyCode: number | undefined;
        // TouchEvent
        changedTouches: TouchList | undefined;
        targetTouches: TouchList | undefined;
        touches: TouchList | undefined;
        // MouseEvent, KeyboardEvent
        which: number | undefined;
        // MouseEvent, KeyboardEvent, TouchEvent
        altKey: boolean | undefined;
        ctrlKey: boolean | undefined;
        metaKey: boolean | undefined;
        shiftKey: boolean | undefined;
        timeStamp: number;
        type: string;
        isDefaultPrevented(): boolean;
        isImmediatePropagationStopped(): boolean;
        isPropagationStopped(): boolean;
        preventDefault(): void;
        stopImmediatePropagation(): void;
        stopPropagation(): void;
    }

    export interface TriggeredEvent<
    TDelegateTarget = any,
    TData = any,
    TCurrentTarget = any,
    TTarget = any
    > extends Event {
        currentTarget: TCurrentTarget;
        delegateTarget: TDelegateTarget;
        target: TTarget;
        data: TData;
        namespace?: string | undefined;
        originalEvent?: NativeEvent | undefined;
        result?: any;
    }

    export type List<T> = ArrayLike<T>;
    export type ListIterator<T, TResult> = (value: T, index: number, collection: List<T>) => TResult;
    export type MemoIterator<T, TResult> = (prev: TResult, curr: T, indexOrKey: any, list: T[]) => TResult;

    export type _Result<T> = T | (() => T);
    export type _StringKey<T> = keyof T & string;

    export interface AddOptions extends Silenceable {
        at?: number | undefined;
        merge?: boolean | undefined;
        sort?: boolean | undefined;
    }

    export interface CollectionSetOptions extends Parseable, Silenceable {
        add?: boolean | undefined;
        remove?: boolean | undefined;
        merge?: boolean | undefined;
        at?: number | undefined;
        sort?: boolean | undefined;
    }

    export interface Silenceable {
        silent?: boolean | undefined;
    }

    export interface Validable {
        validate?: boolean | undefined;
    }

    export interface Parseable {
        parse?: boolean | undefined;
    }

    export interface ModelConstructorOptions<TModel extends Model = Model> extends ModelSetOptions, Parseable {
        collection?: Collection<TModel> | undefined;
    }

    export type CombinedModelConstructorOptions<E, M extends Model<any, any, E> = Model> = ModelConstructorOptions<M> & E;

    export interface ModelSetOptions extends Silenceable, Validable {}

    export type ObjectHash = Record<string, any>;

    /**
     * DOM events (used in the events property of a View)
     */
    export interface EventsHash {
        [selector: string]: string | { (eventObject: mvc.TriggeredEvent): void };
    }

    /**
     * JavaScript events (used in the methods of the Events interface)
     */
    export interface EventHandler {
        (...args: any[]): void;
    }
    export interface EventMap {
        [event: string]: EventHandler;
    }

    const Events: Events;
    export interface Events extends EventsMixin {}

    /**
     * Helper shorthands for classes that implement the Events interface.
     * Define your class like this:
     *
     *
     * class YourClass implements Events {
     *     on: Events_On<YourClass>;
     *     off: Events_Off<YourClass>;
     *     trigger: Events_Trigger<YourClass>;
     *     bind: Events_On<YourClass>;
     *     unbind: Events_Off<YourClass>;
     *
     *     once: Events_On<YourClass>;
     *     listenTo: Events_Listen<YourClass>;
     *     listenToOnce: Events_Listen<YourClass>;
     *     stopListening: Events_Stop<YourClass>;
     *
     *     // ... (other methods)
     * }
     *
     * Object.assign(YourClass.prototype, Events);  // can also use _.extend
     *
     * If you are just writing a class type declaration that doesn't already
     * extend some other base class, you can use the EventsMixin instead;
     * see below.
     */
    export interface Events_On<BaseT> {
        <T extends BaseT>(this: T, eventName: string, callback: EventHandler, context?: any): T;
        <T extends BaseT>(this: T, eventMap: EventMap, context?: any): T;
    }
    export interface Events_Off<BaseT> {
        <T extends BaseT>(this: T, eventName?: string | null, callback?: EventHandler | null, context?: any): T;
    }
    export interface Events_Trigger<BaseT> {
        <T extends BaseT>(this: T, eventName: string, ...args: any[]): T;
    }
    export interface Events_Listen<BaseT> {
        <T extends BaseT>(this: T, object: any, events: string, callback: EventHandler): T;
        <T extends BaseT>(this: T, object: any, eventMap: EventMap): T;
    }
    export interface Events_Stop<BaseT> {
        <T extends BaseT>(this: T, object?: any, events?: string, callback?: EventHandler): T;
    }

    /**
     * Helper to avoid code repetition in type declarations.
     * Events cannot be extended, hence a separate abstract
     * class with a different name. Both classes and interfaces can
     * extend from this helper class to reuse the signatures.
     *
     * For class type declarations that already extend another base
     * class, and for actual class definitions, please see the
     * Events_* interfaces above.
     */
    export abstract class EventsMixin implements Events {
        on(eventName: string, callback: EventHandler, context?: any): this;
        on(eventMap: EventMap, context?: any): this;
        off(eventName?: string | null, callback?: EventHandler | null, context?: any): this;
        trigger(eventName: string, ...args: any[]): this;
        bind(eventName: string, callback: EventHandler, context?: any): this;
        bind(eventMap: EventMap, context?: any): this;
        unbind(eventName?: string, callback?: EventHandler, context?: any): this;

        once(events: string, callback: EventHandler, context?: any): this;
        once(eventMap: EventMap, context?: any): this;
        listenTo(object: any, events: string, callback: EventHandler): this;
        listenTo(object: any, eventMap: EventMap): this;
        listenToOnce(object: any, events: string, callback: EventHandler): this;
        listenToOnce(object: any, eventMap: EventMap): this;
        stopListening(object?: any, events?: string, callback?: EventHandler): this;
    }

    export class ModelBase extends EventsMixin {
        toJSON(options?: any): any;
    }

    /**
     * E - Extensions to the model constructor options. You can accept additional constructor options
     * by listing them in the E parameter.
     */
    export class Model<T extends ObjectHash = any, S = ModelSetOptions, E = any> extends ModelBase implements Events {
        /**
         * Do not use, prefer TypeScript's extend functionality.
         */
        static extend(properties: any, classProperties?: any): any;

        attributes: Partial<T>;
        changed: Partial<T>;
        cidPrefix: string;
        cid: string;
        collection: Collection<this>;

        private _changing: boolean;
        private _previousAttributes: Partial<T>;
        private _pending: boolean;

        /**
         * Default attributes for the model. It can be an object hash or a method returning an object hash.
         * For assigning an object hash, do it like this: this.defaults = <any>{ attribute: value, ... };
         * That works only if you set it in the constructor or the initialize method.
         */
        defaults(): Partial<T>;
        id: string | number;
        idAttribute: string;
        validationError: any;

        /**
         * For use with models as ES classes. If you define a preinitialize
         * method, it will be invoked when the Model is first created, before
         * any instantiation logic is run for the Model.
         */
        preinitialize(attributes?: T, options?: CombinedModelConstructorOptions<E, this>): void;

        constructor(attributes?: T, options?: CombinedModelConstructorOptions<E>);
        initialize(attributes?: T, options?: CombinedModelConstructorOptions<E, this>): void;


        /**
         * For strongly-typed access to attributes, use the `get` method only privately in public getter properties.
         * @example
         * get name(): string {
         *    return super.get("name");
         * }
         */
        get<A extends _StringKey<T>>(attributeName: A): T[A] | undefined;

        /**
         * For strongly-typed assignment of attributes, use the `set` method only privately in public setter properties.
         * @example
         * set name(value: string) {
         *    super.set("name", value);
         * }
         */
        set<A extends _StringKey<T>>(attributeName: A, value?: T[A], options?: S): this;
        set(attributeName: Partial<T>, options?: S): this;
        set<A extends _StringKey<T>>(attributeName: A | Partial<T>, value?: T[A] | S, options?: S): this;

        /**
         * Return an object containing all the attributes that have changed, or
         * false if there are no changed attributes. Useful for determining what
         * parts of a view need to be updated and/or what attributes need to be
         * persisted to the server. Unset attributes will be set to undefined.
         * You can also pass an attributes object to diff against the model,
         * determining if there *would be* a change.
         */
        changedAttributes(attributes?: Partial<T>): Partial<T> | false;
        clear(options?: Silenceable): this;
        clone(): Model;
        escape(attribute: _StringKey<T>): string;
        has(attribute: _StringKey<T>): boolean;
        hasChanged(attribute?: _StringKey<T>): boolean;
        isValid(options?: any): boolean;
        previous<A extends _StringKey<T>>(attribute: A): T[A] | null | undefined;
        previousAttributes(): Partial<T>;
        unset(attribute: _StringKey<T>, options?: Silenceable): this;
        validate(attributes: Partial<T>, options?: any): any;
        private _validate(attributes: Partial<T>, options: any): boolean;

    }

    export class Collection<TModel extends Model = Model> extends ModelBase implements Events {
        /**
         * Do not use, prefer TypeScript's extend functionality.
         */
        static extend(properties: any, classProperties?: any): any;

        model: new (...args: any[]) => TModel;
        models: TModel[];
        length: number;

        /**
         * For use with collections as ES classes. If you define a preinitialize
         * method, it will be invoked when the Collection is first created and
         * before any instantiation logic is run for the Collection.
         */
        preinitialize(models?: TModel[] | Array<Record<string, any>>, options?: any): void;

        constructor(models?: TModel[] | Array<Record<string, any>>, options?: any);
        initialize(models?: TModel[] | Array<Record<string, any>>, options?: any): void;


        /**
         * Specify a model attribute name (string) or function that will be used to sort the collection.
         */
        comparator:
        | string
        | { bivarianceHack(element: TModel): number | string }['bivarianceHack']
        | { bivarianceHack(compare: TModel, to?: TModel): number }['bivarianceHack'];

        add(model: {} | TModel, options?: AddOptions): TModel;
        add(models: Array<{} | TModel>, options?: AddOptions): TModel[];
        at(index: number): TModel;
        /**
         * Get a model from a collection, specified by an id, a cid, or by passing in a model.
         */
        get(id: number | string | Model): TModel;
        has(key: number | string | Model): boolean;
        clone(): this;
        push(model: TModel, options?: AddOptions): TModel;
        pop(options?: Silenceable): TModel;
        remove(model: {} | TModel, options?: Silenceable): TModel;
        remove(models: Array<{} | TModel>, options?: Silenceable): TModel[];
        reset(models?: Array<{} | TModel>, options?: Silenceable): TModel[];

        /**
         *
         * The set method performs a "smart" update of the collection with the passed list of models.
         * If a model in the list isn't yet in the collection it will be added; if the model is already in the
         * collection its attributes will be merged; and if the collection contains any models that aren't present
         * in the list, they'll be removed. All of the appropriate "add", "remove", and "change" events are fired as
         * this happens. Returns the touched models in the collection. If you'd like to customize the behavior, you can
         * disable it with options: {add: false}, {remove: false}, or {merge: false}.
         * @param models
         * @param options
         */
        set(models?: Array<{} | TModel>, options?: CollectionSetOptions): TModel[];
        shift(options?: Silenceable): TModel;
        sort(options?: Silenceable): this;
        unshift(model: TModel, options?: AddOptions): TModel;
        modelId(attrs: any): any;

        values(): Iterator<TModel>;
        keys(): Iterator<any>;
        entries(): Iterator<[any, TModel]>;
        [Symbol.iterator](): Iterator<TModel>;

        private _prepareModel(attributes?: any, options?: any): any;
        private _removeReference(model: TModel): void;
        private _onModelEvent(event: string, model: TModel, collection: Collection<TModel>, options: any): void;
        private _isModel(obj: any): obj is Model;

        /**
         * Return a shallow copy of this collection's models, using the same options as native Array#slice.
         */
        slice(min?: number, max?: number): TModel[];

        // array methods

        each(iterator: ListIterator<TModel, void>, context?: any): void;
        find(iterator: ListIterator<TModel, boolean>, context?: any): TModel | undefined;
        findIndex(iterator: ListIterator<TModel, boolean>, context?: any): number;
        filter(iterator: ListIterator<TModel, boolean>, context?: any): TModel[];
        first(): TModel;
        includes(value: TModel): boolean;
        isEmpty(): boolean;
        last(): TModel;
        map<TResult>(iterator: ListIterator<TModel, TResult>, context?: any): TResult[];
        reduce<TResult>(iterator: MemoIterator<TModel, TResult>, memo?: TResult): TResult;
        sortBy(iterator?: ListIterator<TModel, any>, context?: any): TModel[];
        sortBy(iterator: string, context?: any): TModel[];
        toArray(): TModel[];

    }

    export interface ViewBaseOptions<TModel extends (Model | undefined) = Model, TElement extends Element = HTMLElement> {
        model?: TModel | undefined;
        // TODO: quickfix, this can't be fixed easy. The collection does not need to have the same model as the parent view.
        collection?: Collection<any> | undefined; // was: Collection<TModel>;
        el?: $Element<TElement> | string | undefined;
        id?: string | undefined;
        attributes?: Record<string, any> | undefined;
        className?: string | undefined;
        tagName?: string | undefined;
        events?: _Result<EventsHash> | undefined;
    }

    export type ViewBaseEventListener = (event: mvc.Event) => void;

    export class ViewBase<TModel extends (Model | undefined) = Model, TElement extends Element = HTMLElement> extends EventsMixin implements Events {
        /**
         * Do not use, prefer TypeScript's extend functionality.
         */
        static extend(properties: any, classProperties?: any): any;

        /**
         * For use with views as ES classes. If you define a preinitialize
         * method, it will be invoked when the view is first created, before any
         * instantiation logic is run.
         */
        preinitialize(options?: ViewBaseOptions<TModel, TElement>): void;

        constructor(options?: ViewBaseOptions<TModel, TElement>);
        initialize(options?: ViewBaseOptions<TModel, TElement>): void;

        /**
         * Events hash or a method returning the events hash that maps events/selectors to methods on your View.
         * For assigning events as object hash, do it like this: this.events = <any>{ "event:selector": callback, ... };
         * That works only if you set it in the constructor or the initialize method.
         */
        events(): EventsHash;

        // A conditional type used here to prevent `TS2532: Object is possibly 'undefined'`
        model: TModel extends Model ? TModel : undefined;
        collection: Collection<any>;
        setElement(element: $Element<TElement>): this;
        id?: string | undefined;
        cid: string;
        className?: string | undefined;
        tagName: string;

        el: TElement;
        attributes: Record<string, any>;
        /* @deprecated use `el` instead */
        $el: Dom;
        /* @deprecated use `el.querySelector()` instead */
        $(selector: string): Dom;
        render(): this;
        remove(): this;
        delegateEvents(events?: _Result<EventsHash>): this;
        delegate(eventName: string, selector: string, listener: ViewBaseEventListener): this;
        undelegateEvents(): this;
        undelegate(eventName: string, selector?: string, listener?: ViewBaseEventListener): this;

        protected _removeElement(): void;
        protected _setElement(el: $Element<TElement>): void;
        protected _createElement(tagName: string): void;
        protected _ensureElement(): void;
        protected _setAttributes(attributes: Record<string, any>): void;
    }

    export interface ViewOptions<T extends (mvc.Model | undefined), E extends Element = HTMLElement> extends mvc.ViewBaseOptions<T, E> {
        theme?: string;
        [key: string]: any;
    }

    export interface viewEventData {
        [key: string]: any;
    }

    export class View<T extends (mvc.Model | undefined), E extends Element = HTMLElement> extends mvc.ViewBase<T, E> {

        constructor(opt?: ViewOptions<T, E>);

        UPDATE_PRIORITY: number;
        DETACHABLE: boolean;
        FLAG_INSERT: number;
        FLAG_REMOVE: number;
        FLAG_INIT: number;

        vel: E extends HTMLElement ? null : Vectorizer;

        svgElement: boolean;

        options: ViewOptions<T, E>;

        theme: string;

        themeClassNamePrefix: string;

        defaultTheme: string;

        requireSetThemeOverride: boolean;

        documentEvents?: mvc.EventsHash;

        children?: dia.MarkupJSON;

        childNodes?: { [key: string]: Element } | null;

        style?: { [key: string]: any };

        setTheme(theme: string, opt?: { override?: boolean }): this;

        getEventNamespace(): string;

        delegateDocumentEvents(events?: mvc.EventsHash, data?: viewEventData): this;

        undelegateDocumentEvents(): this;

        delegateElementEvents(element: Element, events?: mvc.EventsHash, data?: viewEventData): this;

        undelegateElementEvents(element: Element): this;

        eventData(evt: dia.Event): viewEventData;
        eventData(evt: dia.Event, data: viewEventData): this;

        stopPropagation(evt: dia.Event): this;
        isPropagationStopped(evt: dia.Event): boolean;

        renderChildren(children?: dia.MarkupJSON): this;

        findAttribute(attributeName: string, node: Element): string | null;

        confirmUpdate(flag: number, opt: { [key: string]: any }): number;

        unmount(): void;

        isMounted(): boolean;

        protected init(): void;

        protected onRender(): void;

        protected onSetTheme(oldTheme: string, newTheme: string): void;

        protected onRemove(): void;
    }

    export type ModifiedCallback<CallbackArgs extends any[], EventCallback extends Callback> = (...args: [...CallbackArgs, ...Parameters<EventCallback>]) => any;

    export type EventHashMap<CallbackArgs extends any[], T extends Record<keyof T, Callback>> = {
        [Property in keyof T]?: ModifiedCallback<CallbackArgs, T[Property]>;
    };

    export type Callback = (...args: any[]) => any;

    export class Listener<Args extends any[]> {
        constructor(...callbackArguments: Args);

        callbackArguments: Args;

        listenTo<CB extends Callback>(object: any, evt: string, callback: ModifiedCallback<Args, CB>, context?: any): void;
        listenTo<EventCBMap extends Record<keyof EventCBMap, Callback> = { [eventName: string]: Callback }>(object: any, eventHashMap: EventHashMap<Args, EventCBMap>, context?: any): void;

        stopListening(): void;
    }
}

declare type NativeEvent = Event;

export declare namespace routers {

    export interface NormalRouterArguments {

    }

    export interface ManhattanRouterArguments {
        step?: number;
        padding?: dia.Sides;
        maximumLoops?: number;
        maxAllowedDirectionChange?: number;
        perpendicular?: boolean;
        excludeEnds?: dia.LinkEnd[];
        excludeTypes?: string[];
        startDirections?: dia.OrthogonalDirection[];
        endDirections?: dia.OrthogonalDirection[];
        isPointObstacle?: (point: dia.Point) => boolean;
        fallbackRouter: (vertices: dia.Point[], opts?: ManhattanRouterArguments, linkView?: dia.LinkView) => dia.Point[];
    }

    export interface OrthogonalRouterArguments {
        elementPadding?: number;
        padding?: dia.Sides;
    }

    export interface OneSideRouterArguments {
        side?: dia.OrthogonalDirection;
        padding?: dia.Sides;
    }

    export interface RouterArgumentsMap {
        'normal': NormalRouterArguments;
        'manhattan': ManhattanRouterArguments;
        'metro': ManhattanRouterArguments;
        'orthogonal': OrthogonalRouterArguments;
        /**
         * @deprecated use `rightAngle` instead
         */
        'oneSide': OneSideRouterArguments;
        'rightAngle': RightAngleRouterArguments;
        [key: string]: { [key: string]: any };
    }

    export type RouterType = keyof RouterArgumentsMap;

    export type GenericRouterArguments<K extends RouterType> = RouterArgumentsMap[K];

    export interface GenericRouter<K extends RouterType> {
        (
        vertices: dia.Point[],
        args?: GenericRouterArguments<K>,
        linkView?: dia.LinkView
        ): dia.Point[];
    }

    export interface GenericRouterJSON<K extends RouterType> {
        name: K;
        args?: GenericRouterArguments<K>;
    }

    export type RouterArguments = GenericRouterArguments<RouterType>;

    export type Router = GenericRouter<RouterType>;

    export type RouterJSON = GenericRouterJSON<RouterType>;

    var manhattan: GenericRouter<'manhattan'>;
    var metro: GenericRouter<'metro'>;
    var normal: GenericRouter<'normal'>;
    var orthogonal: GenericRouter<'orthogonal'>;
    /**
     * @deprecated use `rightAngle` instead
     */
    var oneSide: GenericRouter<'oneSide'>;

    /* Right Angle Router */

    export enum RightAngleDirections {
        AUTO = 'auto',
        LEFT = 'left',
        RIGHT = 'right',
        TOP = 'top',
        BOTTOM = 'bottom',
        ANCHOR_SIDE = 'anchor-side',
        MAGNET_SIDE = 'magnet-side'
    }

    export interface RightAngleRouterArguments {
        margin?: number;
        /** @experimental before version 4.0 */
        useVertices?: boolean;
        sourceDirection?: RightAngleDirections;
        targetDirection?: RightAngleDirections;
    }

    export interface RightAngleRouter extends GenericRouter<'rightAngle'> {
        Directions: typeof RightAngleDirections;
    }

    var rightAngle: RightAngleRouter;
}

export declare function setTheme(theme: string): void;

export declare namespace shapes {

    export interface SVGTextSelector extends dia.Cell.Selectors {
        text?: attributes.SVGTextAttributes;
    }

    export interface SVGRectSelector extends dia.Cell.Selectors {
        rect?: attributes.SVGRectAttributes;
    }

    export interface SVGCircleSelector extends dia.Cell.Selectors {
        circle?: attributes.SVGCircleAttributes;
    }

    export interface SVGEllipseSelector extends dia.Cell.Selectors {
        ellipse?: attributes.SVGEllipseAttributes;
    }

    export interface SVGPolygonSelector extends dia.Cell.Selectors {
        polygon?: attributes.SVGPolygonAttributes;
    }

    export interface SVGPolylineSelector extends dia.Cell.Selectors {
        polyline?: attributes.SVGPolylineAttributes;
    }

    export interface SVGImageSelector extends dia.Cell.Selectors {
        image?: attributes.SVGImageAttributes;
    }

    export interface SVGPathSelector extends dia.Cell.Selectors {
        path?: attributes.SVGPathAttributes;
    }

    export namespace standard {

        export interface RectangleSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type RectangleAttributes = dia.Element.GenericAttributes<RectangleSelectors>;

        export class Rectangle extends dia.Element<RectangleAttributes> {
        }

        export interface CircleSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGCircleAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type CircleAttributes = dia.Element.GenericAttributes<CircleSelectors>;

        export class Circle extends dia.Element<CircleAttributes> {
        }

        export interface EllipseSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGEllipseAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type EllipseAttributes = dia.Element.GenericAttributes<EllipseSelectors>;

        export class Ellipse extends dia.Element<EllipseAttributes> {
        }

        export interface PathSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPathAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type PathAttributes = dia.Element.GenericAttributes<PathSelectors>;

        export class Path extends dia.Element<PathAttributes> {
        }

        export interface PolygonSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolygonAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type PolygonAttributes = dia.Element.GenericAttributes<PolygonSelectors>;

        export class Polygon extends dia.Element<PolygonAttributes> {
        }

        export interface PolylineSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGPolylineAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type PolylineAttributes = dia.Element.GenericAttributes<PolylineSelectors>;

        export class Polyline extends dia.Element<PolylineAttributes> {
        }

        export interface ImageSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type ImageAttributes = dia.Element.GenericAttributes<ImageSelectors>;

        export class Image extends dia.Element<ImageAttributes> {
        }

        export interface BorderedImageSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGRectAttributes;
            background?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type BorderedImageAttributes = dia.Element.GenericAttributes<BorderedImageSelectors>;

        export class BorderedImage extends dia.Element<BorderedImageAttributes> {
        }

        export interface EmbeddedImageSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type EmbeddedImageAttributes = dia.Element.GenericAttributes<EmbeddedImageSelectors>;

        export class EmbeddedImage extends dia.Element<EmbeddedImageAttributes> {
        }

        export interface InscribedImageSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            border?: attributes.SVGEllipseAttributes;
            background?: attributes.SVGEllipseAttributes;
            image?: attributes.SVGImageAttributes;
            label?: attributes.SVGTextAttributes;
        }

        export type InscribedImageAttributes = dia.Element.GenericAttributes<InscribedImageSelectors>;

        export class InscribedImage extends dia.Element<InscribedImageAttributes> {
        }

        export interface HeaderedRectangleSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            header?: attributes.SVGRectAttributes;
            headerText?: attributes.SVGTextAttributes;
            bodyText?: attributes.SVGTextAttributes;
        }

        export type HeaderedRectangleAttributes = dia.Element.GenericAttributes<HeaderedRectangleSelectors>;

        export class HeaderedRectangle extends dia.Element<HeaderedRectangleAttributes> {
        }

        export interface CylinderBodyAttributes extends attributes.SVGPathAttributes {
            lateralArea?: string | number;
        }

        export interface CylinderSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: CylinderBodyAttributes;
            top?: attributes.SVGEllipseAttributes;
        }

        export type CylinderAttributes = dia.Element.GenericAttributes<CylinderSelectors>;

        export class Cylinder<S extends mvc.ModelSetOptions = dia.ModelSetOptions> extends dia.Element<CylinderAttributes, S> {
            topRy(): string | number;
            topRy(t: string | number, opt?: S): this;
        }

        export interface TextBlockSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            body?: attributes.SVGRectAttributes;
            label?: {
                text?: string;
                style?: { [key: string]: any };
                [key: string]: any;
            };
        }

        export type TextBlockAttributes = dia.Element.GenericAttributes<TextBlockSelectors>;

        export class TextBlock extends dia.Element<TextBlockAttributes> {
        }

        export interface LinkSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            wrapper?: attributes.SVGPathAttributes;
        }

        export type LinkAttributes = dia.Link.GenericAttributes<LinkSelectors>;

        export class Link extends dia.Link<LinkAttributes> {
        }

        export interface DoubleLinkSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            outline?: attributes.SVGPathAttributes;
        }

        export type DoubleLinkAttributes = dia.Link.GenericAttributes<DoubleLinkSelectors>;

        export class DoubleLink extends dia.Link<DoubleLinkAttributes> {
        }

        export interface ShadowLinkSelectors extends dia.Cell.Selectors {
            root?: attributes.SVGAttributes;
            line?: attributes.SVGPathAttributes;
            shadow?: attributes.SVGPathAttributes;
        }

        export type ShadowLinkAttributes = dia.Link.GenericAttributes<ShadowLinkSelectors>;

        export class ShadowLink extends dia.Link<ShadowLinkAttributes> {
        }
    }

    export namespace devs {

        export interface ModelSelectors extends dia.Cell.Selectors {
            '.label'?: attributes.SVGTextAttributes;
            '.body'?: attributes.SVGRectAttributes;
        }

        export interface ModelAttributes extends dia.Element.GenericAttributes<ModelSelectors> {
            inPorts?: string[];
            outPorts?: string[];
        }

        export class Model extends dia.Element {

            constructor(attributes?: ModelAttributes, opt?: { [key: string]: any });

            changeInGroup(properties: any, opt?: any): boolean;

            changeOutGroup(properties: any, opt?: any): boolean;

            createPortItem(group: string, port: string): any;

            createPortItems(group: string, ports: string[]): any[];

            addOutPort(port: string, opt?: any): this;

            addInPort(port: string, opt?: any): this;

            removeOutPort(port: string, opt?: any): this;

            removeInPort(port: string, opt?: any): this;
        }

        export class Coupled extends Model {

        }

        export class Atomic extends Model {

        }

        export class Link extends dia.Link {

        }
    }
}

export declare namespace util {

    export function hashCode(str: string): string;

    export function getByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function setByPath(object: { [key: string]: any }, path: string | string[], value: any, delim?: string): any;

    export function unsetByPath(object: { [key: string]: any }, path: string | string[], delim?: string): any;

    export function flattenObject(object: { [key: string]: any }, delim?: string, stop?: (node: any) => boolean): any;

    export function uuid(): string;

    export function svg(strings: TemplateStringsArray, ...expressions: any): dia.MarkupJSON;

    export function guid(obj?: { [key: string]: any }): string;

    export function toKebabCase(str: string): string;

    export function normalizeEvent(evt: dia.Event): dia.Event;

    export function nextFrame(callback: () => void, context?: { [key: string]: any }, ...args: any[]): number;

    export function cancelFrame(requestId: number): void;

    export function isPercentage(val: any): boolean;

    export function parseCssNumeric(val: any, restrictUnits: string | string[]): { value: number, unit?: string } | null;

    export type BreakTextFunction = (
    text: string,
    size: { width: number, height?: number },
    attrs?: attributes.NativeSVGAttributes,
    opt?: {
        svgDocument?: SVGElement;
        separator?: string | any;
        eol?: string;
        ellipsis?: boolean | string;
        hyphen?: string | RegExp;
        maxLineCount?: number;
        preserveSpaces?: boolean;
    }
    ) => string;

    var breakText: BreakTextFunction;

    export function sanitizeHTML(html: string): string;

    export function downloadBlob(blob: Blob, fileName: string): void;

    export function downloadDataUri(dataUri: string, fileName: string): void;

    export function dataUriToBlob(dataUri: string): Blob;

    export function imageToDataUri(url: string, callback: (err: Error | null, dataUri: string) => void): void;

    export function getElementBBox(el: Element): dia.BBox;

    export function sortElements(
    elements: mvc.$Element,
    comparator: (a: Element, b: Element) => number
    ): Element[];

    export function setAttributesBySelector(el: Element, attrs: { [selector: string]: { [attribute: string]: any }}): void;

    export function normalizeSides(sides: dia.Sides): dia.PaddingJSON;

    export function template(html: string): (data: any) => string;

    export function toggleFullScreen(el?: Element): void;

    export interface DOMJSONDocument {
        fragment: DocumentFragment;
        selectors: { [key: string]: Element };
        groupSelectors: { [key: string]: Element[] };
    }

    export function parseDOMJSON(json: dia.MarkupJSON): DOMJSONDocument;

    export namespace timing {

        export type TimingFunction = (time: number) => number;

        var linear: TimingFunction;
        var quad: TimingFunction;
        var cubic: TimingFunction;
        var inout: TimingFunction;
        var exponential: TimingFunction;
        var bounce: TimingFunction;

        export function reverse(f: TimingFunction): TimingFunction;

        export function reflect(f: TimingFunction): TimingFunction;

        export function clamp(f: TimingFunction, min?: number, max?: number): TimingFunction;

        export function back(s?: number): TimingFunction;

        export function elastic(x?: number): TimingFunction;
    }

    export namespace interpolate {

        export type InterpolateFunction<T> = (start: T, end: T) => ((time: number) => T);

        var number: InterpolateFunction<number>;
        var object: InterpolateFunction<{ [key: string]: any }>;
        var hexColor: InterpolateFunction<string>;
        var unit: InterpolateFunction<string>;
    }

    export namespace filter {

        export interface FilterArgumentsMap {
            'outline': {
                color?: string;
                opacity?: number;
                margin?: number;
                width?: number;
            };
            'highlight': {
                color?: string;
                blur?: number;
                opacity?: number;
                width?: number;
            };
            'blur': {
                x?: number;
                y?: number;
            };
            'dropShadow': {
                dx?: number;
                dy?: number;
                opacity?: number;
                color?: string;
                blur?: number;
            };
            'grayscale': {
                amount?: number;
            };
            'sepia': {
                amount?: number;
            };
            'saturate': {
                amount?: number;
            };
            'hueRotate': {
                angle?: number;
            };
            'invert': {
                amount?: number;
            };
            'brightness': {
                amount?: number;
            };
            'contrast': {
                amount?: number;
            };
        }

        export type FilterFunction<K extends keyof FilterArgumentsMap> = (args: FilterArgumentsMap[K]) => string;
        export interface FilterJSON<K extends keyof FilterArgumentsMap> {
            name: K;
            id?: string;
            args?: FilterArgumentsMap[K];
            attrs?: attributes.NativeSVGAttributes;
        }

        var outline: FilterFunction<'outline'>;
        var highlight: FilterFunction<'highlight'>;
        var blur: FilterFunction<'blur'>;
        var dropShadow: FilterFunction<'dropShadow'>;
        var grayscale: FilterFunction<'grayscale'>;
        var sepia: FilterFunction<'sepia'>;
        var saturate: FilterFunction<'saturate'>;
        var hueRotate: FilterFunction<'hueRotate'>;
        var invert: FilterFunction<'invert'>;
        var brightness: FilterFunction<'brightness'>;
        var contrast: FilterFunction<'contrast'>;
    }

    export namespace format {

        export interface NumberLocale {
            currency: [string, string];
            decimal: string;
            thousands: string;
            grouping: number[];
        }

        export function number(specifier: string, value: number, locale?: NumberLocale): string;

        export function string(str: string, value: string): string;

        export function convert(type: string, value: number, precision: number): string;

        export function round(value: number, precision?: number): number;

        export function precision(value: number, precision: number): number;

        export function prefix(value: number, precision: number): { scale: (d: number) => number, symbol: string } | undefined;
    }

    // LODASH FUNCTIONS:

    export type NotVoid = {} | null | undefined; // the `any` type without `void` and `never`

    export type Collection = object | any[]; // an object or an array

    export type PropertyPath = string | string[];

    export type IterateeFunction<T> = (value: T) => NotVoid;

    export interface Cancelable {
        cancel(): void;
        flush(): void;
    }

    export type SourceObjectsOptionalFinalCustomizer = Array<object | CustomizerFunction>; // typescript cannot express "any number of objects optionally followed by CustomizerFunction"
    export type CustomizerFunction = (objValue: any, srcValue: any, key: string, object: any, source: any, stack: any) => NotVoid;

    /** @deprecated do not use */
    export function mixin(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated do not use */
    export function deepMixin(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated do not use */
    export function assign(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaults */
    export function supplement(destinationObject: object, ...sourceObjects: object[]): object;

    /** @deprecated use joint.util.defaultsDeep */
    export function deepSupplement(destinationObject: object, ...sourceObjects: object[]): object;

    export function defaults(destinationObject: object, ...sourceObjects: object[]): object;

    export function defaultsDeep(destinationObject: object, ...sourceObjects: object[]): object;

    export function invoke(collection: Collection, methodPath: PropertyPath, args?: any[]): any[];
    export function invoke<ArgsT>(collection: Collection, functionToInvokeForAll: IterateeFunction<ArgsT>, ...args: ArgsT[]): any[];

    export function invokeProperty(object: object, propertyPath: PropertyPath, args?: any[]): any;

    export function sortedIndex<T>(sortedArray: T[], valueToInsert: T, iteratee?: IterateeFunction<T>): number;

    export function uniq<T>(array: Array<T> | null | undefined, iteratee?: IterateeFunction<T>): T[];

    export function clone<T>(value: T): T;

    export function cloneDeep<T>(value: T): T;

    export function isEmpty(value: any): boolean;

    export function isEqual(value: any, otherValue: any): boolean;

    export function isFunction(value: any): boolean;

    export function isPlainObject(value: any): boolean;

    export function toArray(value: any): any[];

    export function debounce<T extends Function>(func: T, wait?: number, options?: { leading?: boolean, maxWait?: number, trailing?: boolean }): T & Cancelable;

    export function groupBy(collection: Collection, iteratee?: IterateeFunction<any>): object;

    export function sortBy<T>(collection: object, iteratee?: IterateeFunction<any>[] | IterateeFunction<any>): any[];
    export function sortBy<T>(collection: T[], iteratee?: IterateeFunction<T>[] | IterateeFunction<T>): any[];

    export function flattenDeep(array: any[]): any[];

    export function without<T>(array: T[], ...values: T[]): T[];

    export function difference<T>(array: T[], ...excludedValuesArrays: T[][]): T[];

    export function intersection<T>(...arrays: T[][]): T[];

    export function union<T>(...arrays: T[][]): T[];

    export function has(object: object, path: PropertyPath): boolean;

    export function result(object: object, propertyPath: PropertyPath, defaultValue?: any): any;

    export function omit(object: object, ...propertyPathsToOmit: PropertyPath[]): object;

    export function pick(object: object, ...propertyPathsToPick: PropertyPath[]): object;

    export function bindAll(object: object, methodNames: string | string[]): object;

    export function forIn<T>(object: T, iteratee?: (value: any, key: string, iterable: object) => void | boolean): void;

    export function camelCase(string: string): string;

    export function uniqueId(prefix?: string | number): string;

    export function getRectPoint(rect: dia.BBox, position: dia.PositionName): g.Point;

    export function merge(destinationObject: object, ...args: any[]): object;

    // ADDITIONAL SIMPLE UTIL FUNCTIONS:

    export function isBoolean(value: any): boolean;

    export function isObject(value: any): boolean;

    export function isNumber(value: any): boolean;

    export function isString(value: any): boolean;

    export function noop(): void;
}

export declare const V: VCallable;

export declare type V = VElement;

declare interface VCallable extends VStatic {

    (
    svg: SVGElement | VElement | string,
    attrs?: { [key: string]: any },
    children?: VElement | VElement[] | SVGElement | SVGElement[]
    ): VElement;
}

export declare const Vectorizer: VCallable;

export declare type Vectorizer = VElement;

export declare namespace Vectorizer {
    export interface RotateOptions {
        absolute?: boolean;
    }

    export interface AnnotateStringOptions {
        includeAnnotationIndices?: boolean;
        offset?: number;
    }

    export type TextVerticalAnchor = 'top' | 'bottom' | 'middle';

    export interface TextOptions {
        eol?: string;
        x?: number | string;
        textVerticalAnchor?: TextVerticalAnchor | number | string;
        lineHeight?: number | string;
        textPath?: string | { [key: string]: any };
        annotations?: TextAnnotation[];
        includeAnnotationIndices?: boolean;
        displayEmpty?: boolean;
    }

    export interface GetBBoxOptions {
        target?: SVGElement | VElement;
        recursive?: boolean;
    }

    export interface TransformOptions {
        absolute?: boolean;
    }

    export interface ParseXMLOptions {
        async?: boolean;
    }

    export interface TextAnnotation {
        start: number;
        end: number;
        attrs: { [key: string]: any };
    }

    // modifiable Matrix. SVGMatrix doesn't allow set on properties or a constructor.
    export interface Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;
    }

    export interface Sample {
        x: number;
        y: number;
        distance: number;
    }

    export interface DecomposedTransformation {
        translateX: number;
        translateY: number;
        scaleX: number;
        scaleY: number;
        skewX: number;
        skewY: number;
        rotation: number;
    }

    export interface RoundedRect extends g.PlainRect {
        'rx'?: number;
        'ry'?: number;
        'top-rx'?: number;
        'top-ry'?: number;
        'bottom-rx'?: number;
        'bottom-ry'?: number;
    }

    export interface Rotation {
        angle: number;
        cx?: number;
        cy?: number;
    }

    export interface Translation {
        tx: number;
        ty: number;
    }

    export interface Scale {
        sx: number;
        sy: number;
    }

    export interface Transform {
        value: string;
        translate: Translation;
        rotate: Rotation;
        scale: Scale;
    }

    export interface QualifiedAttribute {
        ns: string | null;
        local: string;
    }
}

export declare class VElement {

    id: string;
    node: SVGElement;

    getTransformToElement(toElem: SVGGElement | VElement): SVGMatrix;

    transform(): SVGMatrix;
    transform(matrix: SVGMatrix | Vectorizer.Matrix, opt?: Vectorizer.TransformOptions): this;

    translate(): Vectorizer.Translation;
    translate(tx: number, ty?: number, opt?: Vectorizer.TransformOptions): this;

    rotate(): Vectorizer.Rotation;
    rotate(angle: number, cx?: number, cy?: number, opt?: Vectorizer.RotateOptions): this;

    scale(): Vectorizer.Scale;
    scale(sx: number, sy?: number): this;

    bbox(withoutTransformations?: boolean, target?: SVGElement | VElement): g.Rect;

    getBBox(opt?: Vectorizer.GetBBoxOptions): g.Rect;

    text(content: string, opt?: Vectorizer.TextOptions): this;

    removeAttr(name: string): this;

    attr(): { [key: string]: string };
    attr(name: string): string | null;
    attr(name: string, value: any): this;
    attr(attrs: { [key: string]: any }): this;

    normalizePath(): this;

    remove(): this;

    empty(): this;

    append(els: VElement | VElement[] | SVGElement | SVGElement[]): this;

    prepend(els: VElement | VElement[] | SVGElement | SVGElement[]): this;

    before(els: VElement | VElement[] | SVGElement | SVGElement[]): this;

    appendTo(el: SVGElement | VElement): this;

    parent(): VElement | null;

    // returns either this or VElement, no point in specifying this.
    svg(): VElement;

    tagName(): string;

    defs(): VElement | undefined;

    clone(): VElement;

    findOne(selector: string): VElement | undefined;

    find(selector: string): VElement[];

    children(): VElement[];

    index(): number;

    findParentByClass(className: string, terminator?: SVGElement): VElement | null;

    contains(el: SVGElement | VElement): boolean;

    toLocalPoint(x: number, y: number): SVGPoint;

    translateCenterToPoint(p: g.PlainPoint): this;

    translateAndAutoOrient(position: g.PlainPoint, reference: g.PlainPoint, target?: SVGElement | VElement): this;

    animateAlongPath(attrs: { [key: string]: any }, path: SVGElement | VElement): void;

    hasClass(className: string): boolean;

    addClass(className: string): VElement;

    removeClass(className: string): this;

    toggleClass(className: string, switchArg?: boolean): this;

    sample(interval?: number): Vectorizer.Sample[];

    convertToPath(): VElement;

    convertToPathData(): string;

    findIntersection(ref: g.PlainPoint, target: SVGElement | VElement): g.PlainPoint | undefined;

    toGeometryShape(): g.Shape;

    private setAttributes(attrs: { [key: string]: any }): this;

    private setAttribute(name: string, value: string): this;
}

export declare const version: string;

declare interface VStatic {

    createSVGDocument(content: string): Document;

    createSVGStyle(stylesheet: string): SVGStyleElement;

    createCDATASection(data: string): CDATASection;

    uniqueId(): string;

    ensureId(node: SVGElement | VElement): string;

    sanitizeText(text: string): string;

    isUndefined(value: any): boolean;

    isString(value: any): boolean;

    isObject(value: any): boolean;

    isArray(value: any): boolean;

    parseXML(data: string, opt?: Vectorizer.ParseXMLOptions): XMLDocument;

    qualifyAttr(name: string): Vectorizer.QualifiedAttribute;

    transformStringToMatrix(transform: string): SVGMatrix;

    matrixToTransformString(matrix: SVGMatrix | Vectorizer.Matrix): string;

    parseTransformString(transform: string): Vectorizer.Transform;

    deltaTransformPoint(matrix: SVGMatrix | Vectorizer.Matrix, point: SVGPoint | g.PlainPoint): g.PlainPoint;

    decomposeMatrix(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.DecomposedTransformation;

    matrixToScale(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Scale;

    matrixToRotate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Rotation;

    matrixToTranslate(matrix: SVGMatrix | Vectorizer.Matrix): Vectorizer.Translation;

    isV(value: any): boolean;

    isVElement(value: any): boolean;

    isSVGGraphicsElement(value: any): boolean;

    createSVGMatrix(matrix?: SVGMatrix | Partial<Vectorizer.Matrix>): SVGMatrix;

    createSVGTransform(matrix?: SVGMatrix | Partial<Vectorizer.Matrix>): SVGTransform;

    createSVGPoint(x: number, y: number): SVGPoint;

    transformRect(r: g.PlainRect, matrix: SVGMatrix): g.Rect;

    transformPoint(p: g.PlainPoint, matrix: SVGMatrix): g.Point;

    transformLine(p: g.Line, matrix: SVGMatrix): g.Line;

    transformPolyline(p: g.Polyline | g.PlainPoint[], matrix: SVGMatrix): g.Polyline;

    styleToObject(styleString: string): { [key: string]: string };

    createSlicePathData(innerRadius: number, outRadius: number, startAngle: number, endAngle: number): string;

    mergeAttrs(a: any, b: any): any;

    annotateString(t: string, annotations: Vectorizer.TextAnnotation[], opt?: Vectorizer.AnnotateStringOptions): Array< string | { [key: string]: any }> ;

    findAnnotationsAtIndex(annotations: Vectorizer.TextAnnotation[], index: number): Vectorizer.TextAnnotation[];

    findAnnotationsBetweenIndexes(annotations: Vectorizer.TextAnnotation[], start: number, end: number): Vectorizer.TextAnnotation[];

    shiftAnnotations(annotations: Vectorizer.TextAnnotation[], index: number, offset: number): Vectorizer.TextAnnotation[];

    convertLineToPathData(line: string | SVGElement | VElement): string;

    convertPolygonToPathData(line: string | SVGElement | VElement): string;

    convertPolylineToPathData(line: string | SVGElement | VElement): string;

    svgPointsToPath(points: g.PlainPoint[] | SVGPoint[]): string;

    getPointsFromSvgNode(node: SVGElement | VElement): SVGPoint[];

    convertCircleToPathData(circle: string | SVGElement | VElement): string;

    convertEllipseToPathData(ellipse: string | SVGElement | VElement): string;

    convertRectToPathData(rect: string | SVGElement | VElement): string;

    rectToPath(r: Vectorizer.RoundedRect): string;

    normalizePathData(path: string): string;

    toNode(el: SVGElement | VElement | SVGElement[]): SVGElement;

    prototype: VElement;

    attributeNames: { [key: string]: string };

    supportCamelCaseAttributes: boolean;
}

export { }